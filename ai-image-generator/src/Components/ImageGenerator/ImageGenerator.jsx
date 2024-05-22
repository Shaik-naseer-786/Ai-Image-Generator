import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assests/ai.jpg";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const[loading,setLoading]=useState(false);

  const imageGenerator = async () => {
    if(inputRef.current.value===""){
        return 0;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer YOUR_API_KEY",
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );
  
      let data = await response.json();
  
      if (data.data && data.data.length > 0) {
        let data_array = data.data;
        setImage_url(data_array[0].url);
      } else {
        console.error("No images returned from API");
        setImage_url(default_image); // Set to default image or handle appropriately
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setImage_url(default_image); // Set to default image or handle appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
          <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}>

            </div>
            <div className={loading?"loading-text":"display-none"}>
                Loading.....
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
      
    </div>
  );
};

export default ImageGenerator;
