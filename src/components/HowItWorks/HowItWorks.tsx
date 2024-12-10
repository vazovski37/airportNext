import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "დარეგისტრირდით",
      description:
        "შექმენით ანგარიში და დაამატეთ ინფორმაცია თქვენს შესახებ.",
    },
    {
      number: "2",
      title: "მოძებნეთ მგზავრობა",
      description: "აირჩიეთ დრო და შეიძინეთ თქვენთვის სასურველი ბილეთი.",
    },
    {
      number: "3",
      title: "გისურვებთ კეთილ მგზავრობას",
      description: "მიდით დანიშნულების ადგილას მითთებულ დროს და ისიამობნეთ მგზავრობით.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-violet-600 text-center mb-12">
        როგორ მუშაობს?
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center md:w-1/3"
          >
            <div className="w-12 h-12 rounded-full bg-violet-500 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
              {step.number}
            </div>

            <h3 className="text-xl font-semibold text-violet-600 mb-3">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="w-full h-[2px] bg-violet-300 mx-auto"></div>
      </div>
    </div>
  );
};

export default HowItWorks;
