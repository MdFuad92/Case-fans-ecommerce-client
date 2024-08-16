import cpufan from '../assets/toughair510_01 (1).jpg'

const About = () => {
    return (
        <div id='About' className="flex items-center gap-4 my-10 ">
          <div className='space-y-5'>
          <h3 className="text-5xl font-bold">ABOUT US</h3>
          <p> We are passionate about keeping your PC cool and performing at its best. As enthusiasts ourselves, we understand the importance of reliable, efficient cooling solutions to protect your investment and enhance your computing experience.</p>
          </div>
            <img src={cpufan} alt="" />
            
        </div>
    );
};

export default About;