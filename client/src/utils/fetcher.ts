
export const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if(response.status === 404){
        throw new Error('not found')
    }    
    return response.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }else{
      throw new Error("Unknown Error")
    }    
  }
};
