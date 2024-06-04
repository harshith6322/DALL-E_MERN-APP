/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formfield, Loader } from "../components";
import { preview } from "../assets";
import { getrandomrprompt } from "../utils";

function Createpost() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [genarating, setgenarating] = useState(false);
  const [loading, isloading] = useState(false);

  //form-submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      isloading(true);
      try {
        const response = await fetch("http://localhost:5050/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        const res = await response.json();
        if (res) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        isloading(false);
      }
    } else {
      alert("plz enter prompt and name");
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesuprizeme = () => {
    const randompropmt = getrandomrprompt(form.prompt);
    console.log(randompropmt);
    setform({ ...form, prompt: randompropmt });
  };

  const genaratingbtn = async () => {
    if (form.prompt) {
      try {
        setgenarating(true);
        const response = await fetch("http://localhost:5050/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
      } finally {
        setgenarating(false);
      }
    } else {
      alert("plz enter any prompt");
    }
  };

  return (
    <section className=" ml-5 xl:ml-20">
      <div>
        <h1 className=" frot-extrablod text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[16px] text-[#666e75] max-w[500px]">
          Create && Showcase with DALL-E AI
        </p>
      </div>

      <form className=" mt-16 max-w-3xl" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-5">
          <Formfield
            lablename="your name"
            type="text"
            name="name"
            placholder="john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <Formfield
            lablename="prompt"
            type="text"
            name="propmt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            issuprizeme
            handlesuprizeme={handlesuprizeme}
          />
          <div className=" relative bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className=" w-5/12 h-5/12"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-1/10 object-contain"
              />
            )}

            {genarating && (
              <div className=" absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={genaratingbtn}
            className=" bg-green-600  rounded-[8px] text-[15px] text-white sm:w-full px-5 py-2.5 text-center
            
            "
          >
            {genarating ? "genatating..." : "genarated img"}
          </button>
        </div>
        <div className=" mt-10">
          <p>
            you have created the img you want, you can share it with other in
            the gallery
          </p>
          <button
            type="submit"
            // onClick={handleshare}
            className=" bg-blue-700  rounded-[8px] text-[15px] text-white sm:w-full px-5 py-2.5 text-center mt-10"
          >
            {loading ? "shareing...." : "share with world"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Createpost;
