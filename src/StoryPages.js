

async function narrationToStory (name, story, apikey) {
    try {
      const APIBody = {
        model: "gpt-3.5-turbo", 
        messages: [{"role": "system", "content":"Eres un profesor."},
        {"role": "user", "content": `Un estudiante te cuenta que quiere ser ${story} cuando grande.
        Escribe una historia en 10 páginas CORTAS, incluyendo eventos y detalles interesantes. 
        Al final, el personaje principal, ${name}, cumple su sueño.
        Haz que la historia suene como un cuento para niños con una enseñanza.  
        Cada página debe tener de 1 a 3 frases.`}],
        temperature: 0.5,
        max_tokens: 1000,}

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey,
        },
        body: JSON.stringify(APIBody),
      });
      const data = await response.json();
      const message = data.choices[0].message.content;
      let pagesList = message.split(/Página \d+:/)
      //make sure there are no empty elements in list
      pagesList = pagesList.filter(item => item !== '');
      const removePageNumber = (text) => text.replace(/Página \d+: /, '');
      // Apply the function to each element in the storyList
      const cleanStoryList = pagesList.map(removePageNumber)
      console.log("The narrationToStory function ran successfully. This is the text: " + pagesList)
      return cleanStoryList
    } catch (error) {
      console.error("Error:", error);
      throw new Error("ERROR: There was an error with the API call.");
    }
    
  };

  export {narrationToStory}