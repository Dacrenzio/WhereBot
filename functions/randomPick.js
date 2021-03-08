module.exports = {
  execute(moderatore, message, auto) {
    const embed = require("../functions/sendEmbed.js");
    let roleList = moderatore.roleListID.slice();

    let memberList = [];
    for (let member of moderatore.playerList.keys()) {
      memberList.push(member);
    }

    let listRole = "";

    for (var i = 0; i < moderatore.playerList.size; i += 1) {
      let ranPlayer = Math.floor(Math.random() * memberList.length);

      let extractedPlayer = memberList.splice(ranPlayer, 1)[0];

      if (i === 0) {
        moderatore.playerList.get(extractedPlayer).id = 2;
        listRole += `${extractedPlayer.toString()} ` + compose(2);
        roleList.splice(0, 1);
      } else if (i === 1) {
        moderatore.playerList.get(extractedPlayer).id = 18;
        listRole += `${extractedPlayer.toString()} ` + compose(18);
        roleList.splice(0, 1);
      } else if (i <= moderatore.playerList.size / 4) {
        if (roleList.indexOf(8) > -1) {
          moderatore.playerList.get(extractedPlayer).id = 8;
          listRole += `${extractedPlayer.toString()} ` + compose(8);
          roleList.splice(roleList.indexOf(8), 1);
        } else if (roleList.indexOf(5) > -1) {
          moderatore.playerList.get(extractedPlayer).id = 5;
          listRole += `${extractedPlayer.toString()} ` + compose(5);
          roleList.splice(roleList.indexOf(5), 1);
        } else {
          embed.sendEmbed(
            [255, 0, 0],
            "Inserire almeno 1 lupo ogni 4 giocatori!",
            message.channel
          );
          return false;
        }
      } else {
        let ranRole = Math.floor(Math.random() * roleList.length);
        let extractedRole = roleList.splice(ranRole, 1)[0];
        moderatore.playerList.get(extractedPlayer).id = extractedRole;

        listRole += `${extractedPlayer.toString()} ` + compose(extractedRole);
      }
    }

    if (!auto) embed.sendEmbed([149, 193, 255], listRole, message.member);
    return true;
  },
};

function compose(ranRole) {
  switch (ranRole) {
    case 1:
      return `è il Bardo.\n`;
    case 2:
      return `è il Capo Branco.\n`;
    case 3:
      return `è il Contadino.\n`;
    case 4:
      return `è l'Eremita.\n`;
    case 5:
      return `è il Giovane Lupo.\n`;
    case 6:
      return `è il Giullare.\n`;
    case 7:
      return `è il Guaritore.\n`;
    case 8:
      return `è il Lupo Del Branco.\n`;
    case 9:
      return `è il Mago.\n`;
    case 10:
      return `è il Medium.\n`;
    case 11:
      return `è il Monaco.\n`;
    case 12:
      return `è l'Oste.\n`;
    case 13:
      return `è il Pazzo.\n`;
    case 14:
      return `è il Peccatore.\n`;
    case 15:
      return `è il Prete.\n`;
    case 16:
      return `è il Strega.\n`;
    case 17:
      return `è il Traditore.\n`;
    case 18:
      return `è la Veggente.\n`;
    case 19:
      return `è l'Angelo Custode.\n`;
  }
}
