// As Lambda entry point 

export const handler = async (event: any = {}): Promise<any> => {
    // Hello
    //let hello: string = "Hello Lambda";
    //console.log(hello); 
    
    // Form response 
    const response = JSON.stringify(event, null, 2);
    return response; 
}


