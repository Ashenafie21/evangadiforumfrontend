import React from "react";

const About = () => {
  return (
    <div className="px-10 space-y-4 items-center py-16 mt-16 min-w-[200px] max-w-[700px] mx-auto">
      <p className="text-orange-500">About</p>
      <h1 className="text-xl font-bold">Evangadi Networks</h1>
      <p>
        No matter what stage of life you are in, whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <p>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button className="bg-orange-500 text-white font-bold p-3">
        How It Works
      </button>
    </div>
  );
};

export default About;
