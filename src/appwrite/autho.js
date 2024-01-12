import ids from '../ids/ids.js';
import { Client, Account,Databases, ID } from "appwrite";

class Autho{
    client = new Client();
    databases;
    account;

    constructor(){
        this.client.setEndpoint(ids.Url).setProject(ids.PId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async loginData({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }
        catch (error){
            console.log(error);
            alert(error)
        }
    }

    async getUser(){
        try{
            return await this.account.get()
            .then((resp)=>{
                console.log(resp);
                return resp;
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async logoutData(){
        try{
            await this.account.deleteSessions();
            return true
        }
        catch(error){
            console.log(error);
            return false
        }
    }

    async createCart(id,name){
        try {
            console.log('lll',id);
            const resp = await this.databases.createDocument(
                               ids.DId,
                               ids.CIdca,
                               id,
                               {
                                   userId:name,
                                   carti:[],
                               }
                           )
            if(resp){
                console.log(resp)
                return resp
            }
       }
       catch(error){
           console.log(error)
       }
    }
    async createUser({email,password,name}){
        try{
            const id=ID.unique()
            const response = await this.createCart(id,name) ;
            if (response) {
                return this.account.create(response.$id, email, password, name)
                .then((userAccount)=>{
                    if(userAccount){
                        console.log(userAccount)
                        this.loginData({email, password})
                    }
                })
                .then(()=>{
                    return response.$id;
                })
                .catch((error)=>{alert(error)})
            }
        }
        catch(error){
            console.log(error);
        }
    }
}

const autho = new Autho();

export default autho