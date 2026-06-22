import React from "react";
import KDSH2022 from "../../../../assets/pics/events/KDSH2022_Latest.png"

const Header = () => {
  return (
    <>
      <div className="h-[30rem] !pt-[20rem] bg-cover shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <div class="resources-list-header-title">Kharagpur <span className="bolding"> Data Science</span> Hackathon 2022</div>
      </div>
      <section className="relative flex -mt-[150px]! h-[500px] bg-[rgba(0,0,0,0.7)] justify-center !mb-[20px] max-[480px]:flex-col max-[480px]:h-[300px] max-[480px]:mt-0!">
        <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" 
        target="_blank" 
        className="!pr-[100px]">
          <img 
            src={KDSH2022} 
            height="450" 
            width="700"
            className="max-[480px]:!h-[300px] max-[480px]:!w-[400px]"></img>
        </a>
        <div className="relative overflow-hidden z-10 top-[25%] rounded-[10px] h-[70px] max-[480px]:left-[20%]">
          <a 
            href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" 
            target="_blank" 
            className="text-[30px] font-bold !text-white no-underline uppercase !py-[20px] max-[480px]:!py-[20px] max-[480px]:!px-[60px] !px-[60px] relative duration-200 scale-[2] rounded-[10px] w-auto h-auto top-[10px]hover:shadow-[0_0_5px_#ff7272,inset_0_0_5px_#ff7272] delay-200"
            style={{fontFamily : 'consolas'}}>
              <span
              className="relative z-0 text-white! top-[10px]">
                Register
              </span>
              <div 
              className="absolute -top-[80px] left-0 w-full h-[250px] bg-[#ff7272] shadow-[inset_0_0_50px_rgba(0,0,0,0.7)] -z-20 duration-600 rounded-[10px] hover:-top-[140px]

              before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:top-0 before:left-0 before:-translate-x-[25%] before:-translate-y-[75%] before:rounded-[40%] before:bg-[rgba(26,26,26,0.5)] before:animate-[liquidanimate_7s_linear_infinite]

              after:content-[''] after:absolute after:w-[200%] after:h-[200%] after:top-0 after:left-0 after:-translate-x-[25%] after:-translate-y-[75%] after:rounded-[45%] after:bg-[rgba(0,0,0,1)] after:shadow-[0_0_10px_5px_#ff7272,inset_0_0_5px_#ff7272] after:opacity:0.8 after:animate-[liquidanimate_5s_linear_infinite]
              "></div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Header;