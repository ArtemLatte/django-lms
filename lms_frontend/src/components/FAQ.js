import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function FAQ() {
  const [faqData, setfaqData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/faq/').then((res) => {
        setfaqData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-question-circle-fill me-2 text-primary"></i>
        Часто задаваемые вопросы (FAQ)
      </h3>

      <div className="accordion" id="faqAccordion">
        {faqData &&
          faqData.map((row, index) => (
            <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse-${index}`}
                >
                  <i className="bi bi-chat-right-quote me-2 text-primary"></i>
                  {row.question}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body bg-light">
                  <i className="bi bi-arrow-return-right me-2 text-muted"></i>
                  {row.answer}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FAQ;