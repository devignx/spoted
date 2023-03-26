const Why = () => {

    return(
        <div className=" text-white rale">
            <div className="h-screen w-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl text-white text-center">Why?</h1><br/>
                <a href='#body' className="uppercase text-xs mt-3 rounded-full p-2 px-4 bg-white/10 text-white">Scroll Down ↓</a>
            </div>
            <div id='body' className="w-10/12 m-auto md:w-[68%]">
                <p className="text-left md:text-justify text-xl md:text-2xl lg:text-3xl text-white/80 mt-4">To ensure the security and integrity of our platform, we require users to complete a simple user validation process before accessing certain features. However, this process may be blocked by adblockers or shields, preventing the necessary third-party requests from being fetched. To successfully complete user validation, you will need to temporarily disable your adblocker or shields. Here's why:</p>
            </div>
            <div className="mt-16 w-10/12 m-auto md:w-[68%]">
                <h2 className="text-2xl font-semibold">Why is my adblocker or shield blocking the user validation process?</h2>
                <p className="text-left md:text-justify text-lg text-white/80 mt-4">Our user validation process relies on third-party requests to verify your Unique Identity and ensure the integrity of our platform. These requests are typically blocked by adblockers or shields because they are considered to be advertisements or potential security threats. While we understand the importance of adblockers and shields in protecting your privacy and security, they can interfere with the functioning of our platform.</p>
            </div>
            <div className="mt-16 w-10/12 m-auto md:w-[68%]">
                <h2 className="text-2xl font-semibold">What information is being requested by these third-party requests?</h2>
                <p className="text-left md:text-justify text-lg text-white/80 mt-4">The third-party requests used in our user validation process are only requesting IP Address of your device. We do not collect or share any personal information with these third-party services.</p>
            </div>
            <div className="mt-16 w-10/12 m-auto md:w-[68%]">
                <h2 className="text-2xl font-semibold">How do I disable my adblocker or shield to complete user validation?</h2>
                <p className="text-left md:text-justify text-lg text-white/80 mt-4">To temporarily disable your adblocker or shield, you will need to refer to the instructions provided by your adblocker or shield software. Typically, this involves adding an exception or whitelisting our website in your adblocker or shield settings. Once you have completed user validation, you can enable your adblocker or shield again.</p>
            </div>
            <div className="mt-16 w-10/12 m-auto md:w-[68%]">
                <p className="text-left md:text-justify text-xl md:text-2xl lg:text-3xl text-white/80 mt-4">We understand that disabling your adblocker or shield can be an inconvenience, but it is necessary to ensure the proper functionality of our platform. If you have any questions or concerns about the user validation process, please don't hesitate to contact our support team.</p>
            </div>
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default Why;