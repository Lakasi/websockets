import fs from 'fs/promises'

 export default class ProductManager{
    constructor(path){
        this.path = path
        this.products = []
    }

    async readFile(){
        let json = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(json)
        return 
    }

    async writeFile(){
        let json = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, json)
        return
    }
    async getProducts(){
        await this.readFile()
        return this.products
    }
    async addCosa(objetct) {
        await this.getProducts()
        this.products.push(objetct)
        await this.writeFile()
        return objetct
    }
    async reset(){
        this.products = []
        await this.writeFile()
    }


    // async addProduct(title, description, price, thumbnail, code, stock){
    //     this.readFile()
    //     let id = this.generateId()

    //     if(title && description && price && thumbnail && code && stock){
    //         const codeExist = this.products.some(p => p.code === code)
    //         if(codeExist){
    //             throw new Error("El producto con ese codigo ya existe")
    //         }
    //         else{
    //             this.products.push({title, description, price, thumbnail, code, stock, id: id})
    //             await this.writeFile()
    //         }
    //     }
    //     else{
    //         throw new Error("Faltan campos del producto")
    //     }
        
    // }
    // generateId(){
    //     return (this.products.length === 0 )? 1 : this.products[this.products.length - 1].id + 1;
    // }
    // async getProductById(id){
    //     await this.readFile()

    //     try{
    //         const findProduct = this.products.find(p => p.id === id)
    //         if(!findProduct){
    //             throw new Error(`El producto con ese id no existe ${id}`)
    //         }
    //         else{
    //             return findProduct
    //         }
    //     }
    //     catch(error){
    //         console.log(`Error ${error.message}`)
    //     }

    // }
    // async updateProduct(id, data){
    //     await this.readFile()

    //     const indexId = this.products.findIndex(p => p.id === id)
    //     if(indexId != -1){
    //         this.products[indexId] = {
    //             ...this.products[indexId],
    //             ...data
    //         }
    //         await this.writeFile()
    //     }
        
    //     else{
    //         throw new Error("No existe elemento con ese id")
    //     }
    // }
    // async deleteProduct(id){
    //     await this.readFile()

    //     const indexId = this.products.findIndex(p => p.id === id)
        
    //     if(indexId != -1){
    //         this.products.splice(indexId, 1)
    //         await this.writeFile()
    //     }
    //     else{
    //         throw new Error("No existe elemento con ese id")
    //     }
    // }
    // async getProductsLimited(limit){
    //     await this.readFile()
    //     let productsLimited = []
    //     for(let i=0; i<limit; i++){
    //         if(i<this.products.length) productsLimited.push(this.products[i])
    //     }
    //     return productsLimited
    // }
}




