import React from "react";
// import Header from "../../components/header/Header.js";
// import Footer from "../../components/footer/Footer.js";
// import Content from "../../components/Content.js";
import "./index.css";

function Welcome() {
  return (
    <main>
      <div className="bg-neutral-200 dark:bg-neutral-900 text-white">
        <div className="min-h-wrapper flex flex-col bg-gym-background bg-contain">
          <div className="flex flex-row h-90vh gap-20 justify-center mt-5">
            <div className="flex  flex-col rounded-2xl w-1/3 border border-header-hover-dark border-solid bg-black bg-opacity-85">
              <div className="hover:bg-yellow-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96  transition-transform transform hover:scale-105 cursor-pointer ">
                <div className="flex justify-start gap-10 m-8 flex-row h-14  ">
                  <div className="w-16 flex flex-col justify-center">
                    Fitpass
                  </div>
                  <div className="flex flex-col">
                    <div>Access to every facility with Fitpass</div>
                    <div>
                      In case of using a facility free parking for up to 2 hours
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-5 ml-5 border border-header-hover-dark border-opacity-55"></div>
              <div className="hover:bg-green-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
                <div className="flex justify-start gap-10 m-8 flex-row h-14">
                  <div className="w-16 flex flex-col justify-center">
                    Modern Equipment
                  </div>
                  <div className="flex flex-col">
                    <div>
                      Modern equipment covering every aspect of desired workout
                    </div>
                    <div>
                      Electronic system for queuing for workout in case of big
                      traffic
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
              <div className="hover:bg-purple-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer  transition-transform transform hover:scale-105 ">
                <div className="flex justify-start gap-10 m-8 flex-row h-14">
                  <div className="w-16 flex flex-col justify-center">
                    Healthy Cafe
                  </div>
                  <div className="flex flex-col">
                    <div>Healthy snacks and protein shakes</div>
                    <div>Kitchen with high-protein and healthy food</div>
                  </div>
                </div>
              </div>
              <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
              <div className="hover:bg-slate-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
                <div className="flex justify-start gap-10 m-8 flex-row h-14">
                  <div className="w-16 flex flex-col justify-center">
                    Certified Trainers
                  </div>
                  <div className="flex flex-col">
                    <div>Certified trainers for workout</div>
                    <div>Pilates and yoga circles</div>
                  </div>
                </div>
              </div>
              <div className="mr-5 ml-5 mt-2 border border-header-hover-dark border-opacity-55"></div>
              <div className="hover:bg-teal-400  hover:w-info-board-hover-width rounded-3xl  hover:z-10 hover:h-96 cursor-pointer transition-transform transform hover:scale-105 ">
                <div className="flex justify-start gap-10 m-8 flex-row h-14">
                  <div className="w-16 flex flex-col justify-center">
                    Branches
                  </div>
                  <div className="flex flex-col">
                    <div>Branches on each side of the city</div>
                    <div>Subscription system for every branch</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl w-1/2 border border-black border-solid bg-black bg-opacity-85"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
