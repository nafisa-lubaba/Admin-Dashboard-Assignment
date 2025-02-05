import React from 'react';

const SharedTitle = ({ heading, subHeading }) => {
    return (
        <div className="max-w-3xl mx-auto text-center my-8 sm:my-12 md:my-16 relative px-4">
            <div className="relative">
               
                <div className="relative inline-block">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 leading-tight">
                        {heading}
                    </h3>
                    <div className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-0.5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                </div>
              
               
            </div>
        </div>
    );
};

export default SharedTitle;