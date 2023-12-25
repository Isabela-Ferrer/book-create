// FUNCTION TO CREATE PROMPTS FROM THE STORY PAGES 
async function createURLS(input) {
    const pages = input
    console.log(pages)
    let apikey = "ENTERAPIKEY"
    //Estoy creando un dibujo para la página de un libro infantil que contiene este texto: ${text}. 
    //Qué debería tener esta ilustración? Describe la ilustración en una frase.

    async function pagesToPrompts(text) {
        console.log(text)
        const APIBody = {
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content":"Eres un profesor de primaria"}, 
                      {"role": "Say this is a test"}],
            temperature: 0,
            max_tokens: 500,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        };
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey,
                },
                body: JSON.stringify(APIBody),
            });
            const data = await response.json();
            console.log(data);
            let result = data.choices[0].message.content;
            console.log(result)
            return result
        } catch (error) {
            console.error("Error:", error);
            console.error(error.response.data ?? error.message);
            return "ERROR: Hubo un error con la página. Por favor, mándame un mensaje al número (+1)786-685-9045.";
        }
    }

  
  async function promptsToURLS(prompt) {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer` + apikey,
          },
          body: JSON.stringify({
            model: "dall-e-2",
            prompt: prompt + "ilustración minimalista y alegre.", //pass input prompt as the img generator prompt
            n:1,
            size:"256x256",
          }),
        });
        const data = await response.json();
        console.log(data);
        let imgurl = data.data[0].url
        return imgurl
      } catch (error) {
        console.error("Error making API request:", error);
        return "ERROR: Hubo un error con la página. Por favor, mándame un mensaje al número (+1)786-685-9045.";
      }
    }
  
  
    // CALL BOTH FUNCTIONS AND RETURN THE URLS IN A LIST 

    const imageURLList = [];
    const prompts = [];
/*
    for (let i = 0; i < pages.length; i++) {
        try {
            // Call pagesToPrompts for each page
            let prompt = await pagesToPrompts(pages[i]);
            prompts.push(prompt)
            // Call promptsToURLS for each prompt
            //let imageURL = await promptsToURLS(prompt);
            //imageURLList.push(imageURL);
            //console.log(prompt + ":" + imageURL)
            console.log(prompt)
        } catch (error) {
            console.error("Error:", error);
            // Handle error as needed
        }}
        */

}
//returns a list of urls coming from openai 
export {createURLS}