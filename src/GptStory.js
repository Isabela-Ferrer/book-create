import React from 'react';
import { narrationToStory } from './StoryPages';
import { PDFGenerator } from './Pdf';
import img from "./images/reading-kids.png"
//FORM AND STORY RE WRITING

function GptStory () {
  const [formData, setFormData] = React.useState({
    name: "",
    story:"",
    apiKey: "",
    gender: ""
    });
  const [formSubmitted, setFormSubmitted] = React.useState(false) 
  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
    };
    console.log(formData)
// When form is sumbitted, function handleSumbit is run and the OpenAi api is used to add the story to the story variable. 
// Each page is separated by a <br>
  const [story, setStory] = React.useState("")
  console.log(story)
  async function handleSubmit(event) {
    try {event.preventDefault();
    //asign story list into "story" variable.
    const gptstory = await narrationToStory(formData.name, formData.story, formData.apiKey)
    setStory(gptstory)
    //Show story on page
    console.log("this is the story list:" + gptstory)
       // Pass a callback to PDFGenerator to ensure it's called after setting state
    PDFGenerator(formData.name, formData.gender, gptstory, () => {
        // Do any post-PDF generation logic here
    });
    setFormSubmitted(true)
  }
    catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mt-5">
      <img src={img} alt="kids reading" className="w-50 mb-3"></img>
      <h2 className="text-center mb-4">La Historia de Sus Sueños</h2>
      <form onSubmit={handleSubmit} className="w-75 mx-auto text-start">
        <div className="mb-3">
          <label className="form-label">El nombre del pequeño:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Su genero:</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={formData.gender}
            name="gender"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Su sueño más grande:</label>
          <textarea
            className="form-control"
            id="story"
            value={formData.story}
            name="story"
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Clave API:</label>
          <textarea
            className="form-control"
            id="apiKey"
            value={formData.apiKey}
            name="apiKey"
            onChange={handleChange}
          />
        </div>
        {!formSubmitted && <button type="submit" className="btn btn-primary">
          Submit
        </button>}
      </form>
    </div>

  );
};

export default GptStory;
