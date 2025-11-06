import ids from '../ids/ids.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Backfunc {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(ids.Url).setProject(ids.PId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    getFile(id,b){
        return this.bucket.getFileView(b, id);
    }

    async getDocuments(){
        try{
            return await this.databases.listDocuments(ids.DId,ids.CId,);
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async getBdayDocuments(){
        try{
            return await this.databases.listDocuments(ids.DId,ids.CIdb,);
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async getWedDocuments(){
        try{
            return await this.databases.listDocuments(ids.DId,ids.CIdw,);
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async getCakeDocuments(){
        try{
            return await this.databases.listDocuments(ids.DId,ids.CIdc,);
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async getPastryDocuments(){
        try{
            return await this.databases.listDocuments(ids.DId,ids.CIdp,);
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async getPostb(slug){
        try {
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdb,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPostp(slug){
        try {
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdp,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPostw(slug){
        try {
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdw,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPostc(slug){
        try {
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdc,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPostb(slug){
        try {
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdb,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPostca(slug){
        try {
            return await this.databases.getDocument(
                ids.DId ,
                ids.CIdca,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getCart(id){
        try {
            console.log(id);
            return await this.databases.getDocument(
                ids.DId,
                ids.CIdca,
                id
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async addCart(id,carti){
        try {
            console.log(id);
            return await this.databases.updateDocument(
                ids.DId,
                ids.CIdca,
                id,
                {
                    carti,
                }
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                ids.BIdw,
                ID.unique(),
                file 
            )
        }
        catch(error){
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async custom(id,custom){
        try{
            return await this.databases.updateDocument(
                ids.DId,
                ids.CIdca,
                id,
                {
                    custom,
                }
            
            )
        }catch (error) {
            console.log("Appwrite serive :: custom :: error", error);
            return false
        }
    }
    async deleteFile(id){
        try {
            await this.bucket.deleteFile(
                ids.BIdw,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
}

const backfunc = new Backfunc()

export default backfunc