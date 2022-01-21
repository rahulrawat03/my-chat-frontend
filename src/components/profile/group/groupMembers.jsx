import GroupMember from "./groupMember";
import "./groupMembers.css";

function GroupMembers({ members }) {
  return (
    <div className="members-container">
      <h3 className="members__title">members</h3>
      <section className="group__members">
        {members.map((member) => (
          <GroupMember key={member.memberId} member={member} />
        ))}
      </section>
    </div>
  );
}

export default GroupMembers;
