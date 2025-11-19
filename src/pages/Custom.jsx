import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/index";
import backfunc from "../appwrite/website";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { setCart, setCust } from '../store/ASlice';
import axios from 'axios';

function Custom(props) {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const id = useSelector((state) => state.log.cart);
    const log = useSelector((state) => state.log.logged);

    const [generating, setGenerating] = useState(false);
    const [generatedImageURL, setGeneratedImageURL] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [added, setAdd] = useState(false);

    useEffect(() => {
        setAdd(false);
    }, []);

    // --- REFINED AI GENERATION FUNCTION (Fixes Tiers vs Layers) ---
    const generateImage = async () => {
        const desc = getValues("desc");
        const fla = getValues("fla");
        const fill = getValues("fill");
        const dec = getValues("dec");
        
        if (!desc) {
            alert("Please describe your cake at the top first!");
            return;
        }

        setGenerating(true);
        try {
            // PROMPT ENGINEERING STRATEGY:
            // 1. Structure: Explicitly define 'Tiers' vs 'Layers' to avoid confusion.
            // 2. Geometry: Enforce "descending diameter" so top tiers don't hide bottom ones.
            
            let fullPrompt = `A photorealistic, gourmet cake: ${desc}.`;
            
            // Add structural enforcement
            fullPrompt += ` IMPORTANT STRUCTURE: Stacked tiers must be in strict descending order of width (widest at the bottom, narrowest at the top). Distinct structural tiers, NOT just internal layers. visible steps between tiers.`;

            if (dec) fullPrompt += ` Decorated with ${dec}`;
            if (fla) fullPrompt += `, ${fla} style`; 
            
            // Quality keywords
            fullPrompt += `. Professional food photography, cinematic studio lighting, 8k resolution, highly detailed, sharp focus, appetizing, bokeh background.`;

            console.log("Generating with prompt:", fullPrompt); 

            const encodedPrompt = encodeURIComponent(fullPrompt);
            const randomSeed = Math.floor(Math.random() * 10000);
            
            // Using 'model=flux' is best for following complex structural instructions
            const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true&model=flux`;

            const response = await axios.get(url, { responseType: 'blob' });
            const file = new File([response.data], "ai-generated-cake.jpg", { type: 'image/jpeg' });

            setImageFile(file);
            setGeneratedImageURL(URL.createObjectURL(response.data));

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    // --- SUBMIT FUNCTION ---
    const submit = async (data) => {
        if (!log) {
            alert("Please Login or Signup to place an order.");
            return;
        }

        // LOGIC: Use AI image if it exists. If not, use manual upload.
        // The AI image AUTOMATICALLY overrides the manual one here.
        const fileToUpload = imageFile || (data.image && data.image[0]);

        if (!fileToUpload) {
            alert("Please generate an image or upload a reference photo.");
            return;
        }

        const file = await backfunc.uploadFile(fileToUpload);
        
        if (file) {
            const fileId = file.$id;
            
            // Save all details to the string stored in the database
            const cartItemString = `${fileId} | ${data.fla} | ${data.fill}`;
            
            const currentCart = props.custom || [];
            const newCart = [...currentCart, cartItemString];

            backfunc.custom(id, newCart)
                .then(() => {
                    props.updatecust(newCart);
                    setAdd(true);
                })
                .catch((error) => {
                    console.log("Error updating cart:", error);
                });
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="font-bold text-3xl m-4">Design Your Dream Cake</div>
            <div className="text-xl p-4 text-center">Fill in the details below and let AI visualize your cake!</div>
            
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col w-full h-full items-center justify-center">
                
                {/* 1. MAIN DESCRIPTION (Used for Name AND Prompt) */}
                <div className="w-11/12 h-auto px-2">
                    <Input
                        label="Cake Name / Description:"
                        placeholder="e.g., A 3-tier wedding cake with gold dripping"
                        className="h-16"
                        {...register("desc", { required: true })}
                    />
                </div>

                {/* 2. Other Details */}
                <div className="w-11/12 h-auto px-2">
                    <Input 
                        label="Flavour (e.g., Chocolate, Vanilla):" 
                        className="h-16" 
                        {...register("fla", { required: true })} 
                    />
                </div>
                <div className="w-11/12 h-auto px-2">
                    <Input 
                        label="Filling (e.g., Strawberry Jam, Ganache):" 
                        className="h-16" 
                        {...register("fill", { required: true })} 
                    />
                </div>
                <div className="w-11/12 h-auto px-2">
                    <Input 
                        label="Decoration (e.g., Blue roses, Fondant characters):" 
                        className="h-16" 
                        {...register("dec", { required: true })} 
                    />
                </div>

                {/* 3. Generation & Preview Section */}
                <div className="w-11/12 p-4 flex flex-col items-center border-2 border-dashed border-purple-300 rounded-xl m-4 bg-purple-50">
                    <h3 className="text-lg font-bold mb-2 text-purple-800">Preview</h3>
                    
                    {generatedImageURL ? (
                        <div className="mb-4">
                            <img 
                                src={generatedImageURL} 
                                alt="Generated Cake" 
                                className="rounded-2xl shadow-lg w-64 h-64 object-cover border-4 border-pink-300" 
                            />
                        </div>
                    ) : (
                        <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center mb-4 text-gray-400 border border-gray-200">
                            Image will appear here
                        </div>
                    )}

                    <button 
                        type="button" 
                        onClick={generateImage}
                        disabled={generating}
                        className={`p-3 px-8 rounded-xl text-white font-bold shadow-lg transition-all ${
                            generating ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
                        }`}
                    >
                        {generating ? "AI is Baking... (Please Wait)" : "✨ Generate Preview"}
                    </button>
                </div>

                {/* 4. Optional Manual Upload (Overridden by AI if generated) */}
                <div className="w-11/12 h-auto p-2">
                    <p className="text-sm text-gray-600 ml-4">Or upload manually (Optional):</p>
                    <Input
                        type="file"
                        className="mb-4 h-16"
                        accept="image/png, image/jpg, image/jpeg"
                        {...register("image", { required: false })} 
                    />   
                </div>

                {/* 5. Submit Button */}
                {!added ? (
                    <button type="submit" className='flex h-full align-middle items-center justify-center w-40 m-8 bg-purple-500 text-white font-bold p-4 rounded-2xl shadow-lg hover:bg-purple-600'>
                        Add To Cart
                    </button>
                ) : (
                    <div className='flex align-middle items-center justify-center w-40 m-8 bg-green-500 text-white font-bold p-4 rounded-2xl shadow-lg'>
                        Added!
                    </div>
                )}
            </form>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return{
        cart:state.log.carti,
        custom:state.log.custom,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
        updatecust:(cust)=>{dispatch(setCust(cust))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Custom)