module.exports = {
	description: "says if the mentioned player is a mistic",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		let mentioned = message.mentions.members.first();
		let caller = moderatore.playerList.get(message.member);

		if(caller.alive){ //check if he's roleID: 9 and alive

			if(moderatore.playerList.get(mentioned).misticismo){
				embed.sendEmbed([149,193,255], `${mentioned.toString()} è un mistico`, message.channel);
			}else{
				embed.sendEmbed([149,193,255], `${mentioned.toString()} non è un mistico`, message.channel);
			}
			
		}else{
			embed.sendEmbed([255,0,0], "Sei morto.", message.channel);
		}
	}
}