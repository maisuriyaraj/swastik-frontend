import React, { Fragment, useState } from "react";
import { Card } from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Icon from '@mui/material/Icon';
import Faqs from "../../../assets/json/Faqs.json"


export default function Support() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Fragment>
      <div className="container mt-5" id="support">
        <div className="text-center">
        <h1 className="hero-title text-dark">Do you Want any Help ?</h1>
        </div>
        {Faqs.faqs.map((x,index)=>(
            <Accordion

            className="p-2"
              expanded={expanded === x.question}
              onChange={handleChange(x.question)}
              key={index}
            >
              <AccordionSummary
                expandIcon={<Icon color="primary" fontSize="large">add_circle</Icon>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0,fontSize:"20px" }} className="faq-txt">
                  {x.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{  flexShrink: 0,fontSize:"16px" }} className="faq-txt">
                  {x.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
        ))}
      </div>
    </Fragment>
  );
}
