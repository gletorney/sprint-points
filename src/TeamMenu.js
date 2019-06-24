import React from 'react';

const TeamRow = ({ teamMemberName, teamMemberAvatar}) => ( 
  <div className="pad-left-10 pad-top-5 pad-bottom-5 border-bottom-1-ccc">
    <i className={teamMemberAvatar}></i> {teamMemberName}
  </div>
)

const TeamMenu = ({ team, myUser }) => (
  <div className="team-list left-col border-right-1-ccc marg-bottom-20">
    <div className="bold font-1-3 pad-10 border-bottom-1-ccc">
      Team &mdash;
    </div>
    <div>
      {team.map(
        (team, i) =>
          <TeamRow 
            key={i} 
            teamMemberName={team.name} 
            teamMemberAvatar={team.avatar} />
      )}
    </div>					
  </div>
)

export default TeamMenu;