/**
 * @module Overview.tsx
 * @description Overview Quad Component
 */

import * as React from 'react';

import OverviewPie from './OverviewPie';

const Overview = (props: any) => {

  let display;

  if (!props.selected) {

    display = (<p>Select a company to see their overview</p>);

  } else {

    const {
      description,
      overallScore,
      yearFounded,
      numberEmployees,
      url,
      logo,
    } = props.selected;

    const userIssuesLength = Object.keys(props.selected)
      .filter(key => props.selected[key].alignedScore)
      .length;

    const overall = Math.round(overallScore / userIssuesLength);

    const descrip = description.slice(0, 450);

    const scoreAlign = overall >= 70 ? 'Strong Match' : overall >= 40 ? 'Match' : 'Weak Match';

    display = (
      <React.Fragment>
        <div className="overview-left">
          <div className="overview-company-title">
            {/* <h3>{full_name}</h3> */}
          </div>
          <div id="overall-score-chart">
            <OverviewPie overall={overall} />
          </div>
          <h3>{scoreAlign}</h3>
        </div>

        <div id="overview-right">
          <div id="overview-logo">
            <img src={logo} />
          </div>
          <div id="overview-description-container">
            <p id="company-info">
              {descrip}
            </p>
            <p id="company-info-more">
              <span><strong>Founded: </strong>{yearFounded}</span>
              <span><strong># of Employees: </strong>{
                numberEmployees
                  .toString()
                  .split('')
                  .reverse()
                  .reduce((numString: string, next: string, i: number) => {
                    if (i % 3 === 0 && i !== 0) numString = `${next},` + numString;
                    else numString = next + numString;
                    return numString;
                  }, '')
              }
              </span>
            </p>
            <p id="company-url-pre">
              Learn more at: <a href={`http://${url}`} target="_blank">{url}</a>
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className='quad' id="quad-overview">
      <div className="overview-container">
        {display}
      </div>
    </div>
  );
}

export default Overview;
