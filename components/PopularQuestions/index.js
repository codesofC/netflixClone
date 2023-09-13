import { useState } from "react";

const PopularQuestions = ({ questions }) => {
  const [display, setDisplay] = useState({
    index: 2,
    see: false,
  });

  const handleDisplay = (i) => {
    setDisplay(prevState => {
      if(i - 1 === prevState.index){
        return {
          see: false
        }
      }else{
        return {
          index: i - 1,
          see: true,
        }
      }
    });
  };

  return (
    <div className="mt-5 d-flex flex-column justify-content-center">
      <h1 className="text-white my-3">Perguntas frequentes</h1>
      <div className="d-flex flex-column gap-2">
        {questions.map((item) => (
          <div
            key={item.index}
            className="d-flex flex-column gap-1 justify-content-between"
          >
            <div onClick={() => handleDisplay(item.index)} className="title-container d-flex justify-content-between align-items-center p-3 text-white">
              <div className="fs-5">{item.question}</div>
              <div className="close">
                <span></span>
                <span></span>
              </div>
            </div>

            { display.see && (
              <div
                className={`response ${item.index - 1 === display.index ? 'active' : ''} text-white px-2 py-3 fs-5`}
                style={{ background: "#132144" }}
              >
                {questions[display.index].response.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularQuestions;
