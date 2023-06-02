import React from "react";
import bg_01 from "../assets/bg-01.png";
import commitment from "../assets/commitment.png";
import healthy from "../assets/healthy.png";
import passionate from "../assets/passionate.png";
function AboutPage() {
  return (
    <div>
      {" "}
      {/* //Hero Section */}
      <div>
        <div
          className={`bg-[url(${bg_01})] min-h-[400px] py-[100px] px-[20px]  bg-cover  bg-center flex items-center
`}
        >
          <div className="max-w-2xl   mx-auto ">
            <h1 className="text-5xl  text-center capitalize font-semibold leading-tight  text-white  tracking-wide">
              About <span className="text-primary-green">Us</span>
            </h1>
          </div>
        </div>
      </div>
      {/* //About Us  */}
      <div>
        <div className=" ">
          <div className="flex  text-white  container  ">
            <div className="flex-1 bg-[#152033]  ">
              <div className=" px-10 py-10   ">
                <h3 className="text-4xl font-bold pb-10">
                  Our <span className="text-primary-green">Values</span>
                </h3>

                <div>
                  <div className="flex gap-3 items-center">
                    <img src={commitment} className="h-20 p-2" />
                    <div>
                      <h5 className="text-primary-green font-bold">
                        Commitment
                      </h5>
                      <p>
                        Our commitment to our work and <br />
                        our clients is and unbreakable bond.
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex gap-3 items-center my-5  -right-10 relative  ">
                    <img src={commitment} className="h-20 p-2" />
                    <div>
                      <h5 className="text-primary-green font-bold">
                        Commitment
                      </h5>
                      <p>
                        Our commitment to our work and our clients is and
                        unbreakable bond.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <img src={commitment} className="h-20 p-2" />
                    <div>
                      <h5 className="text-primary-green font-bold">
                        Commitment
                      </h5>
                      <p>
                        Our commitment to our work and our clients is and
                        unbreakable bond.
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex-1  text-black   ">
              <div className=" px-10 py-10">
                <h3 className="text-4xl font-bold pb-10">
                  About <span className="text-primary-green">Us</span>
                </h3>
                <p>
                  PBallU was created with one goal in mind: for all who play
                  pickleball to fall in love with it. For any person seeking to
                  get better, we offer a way to find nearby pickleball coaches.
                  For those that love to talk about pickleball, we offer a news
                  feed where athletes can ask questions, give tips, post videos,
                  or make friends! Looking for a court near you? We got that
                  covered too! We hope to help you fall in love with pickleball
                  and spread that love to those around you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E3E3E3]   pb-16 ">
        <div className="container">
          <div>
            <div>
              <div className="text-center mb-10">
                <h1 className="text-6xl font-bold  pt-16 pb-5">Our History</h1>{" "}
                <p>All Out, All Game, All Season.</p>
              </div>
              <p>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat nostrum, perspiciatis aliquam quam harum sapiente
                  libero itaque ex maiores architecto. Ad culpa necessitatibus
                  omnis! Excepturi impedit consectetur voluptas ducimus nam!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat nostrum, perspiciatis aliquam quam harum sapiente
                  libero itaque ex maiores architecto. Ad culpa necessitatibus
                  omnis! Excepturi impedit consectetur voluptas ducimus nam!
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
