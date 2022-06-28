const PlayerRole = require("./PlayerRole.js");
const embed = require("../functions/sendEmbed.js");
const assignParameters = require("./assignParameters.js");
const random = require("./randomPick.js");

module.exports = class Moderatore {
  nightNum = 0;
  playerNum = -1;
  auraType = false;
  playerList = new Map();
  playerDying = [];
  roleListID = [];
  nightOrder = [];
  burnedPlayer = null;
  numberOfVotes = 0;
  ballottaggio = [];
  numberOfDeadPlayer = 0;
  finished = true;
  automatic = true;

  addPlayer(guildMember) {
    this.playerList.set(guildMember, new PlayerRole());
    return false;
  }

  arePlayerFull() {
    return this.playerList.size === this.playerNum;
  }

  canJoin(message) {
    if (this.playerList.size + 1 <= this.playerNum) {
      //if there's space

      if (!this.playerList.has(message.member)) {
        return true;
      } else {
        //if the player is alredy joined

        embed.sendEmbed(
          [255, 0, 0],
          "Giocatore gia presente.",
          message.channel
        );
      }
    } else {
      //if there isn't space

      embed.sendEmbed(
        [255, 0, 0],
        "Raggiunto il numero massimo di giocatori!",
        message.channel
      );
    }

    return false;
  }

  async newGame(numberOfPlayer, message) {
    //starts a new game with same ppl but different roles

    this.reset();
    this.playerNum = numberOfPlayer;
    this.roleListID = [2, 18];

    //removes the ghosts
    await message.guild.members.fetch();
    let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
    await ghostRole.members.forEach((member) => {
      member.roles.remove(ghostRole);
    });
    await message.guild.members.fetch();
  }

  newgGame(numberOfPlayer, roleListID, message) {
    //starts a new game with same ppl and same roles
    let players = this.playerList;
    this.newGame(numberOfPlayer, message);
    this.roleListID = roleListID;
    this.playerList = players;
  }

  addRoles(args, message) {
    //this method updates the possible roles for the game

    let validArgs = true;
    args.forEach((element) => {
      elem = parseInt(element);
      if (elem >= 1 && elem <= 19 && elem != 2 && elem != 18) {
        this.roleListID.push(elem);
      } else {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai inserito un ID invalido!",
          message.channel
        );
        this.roleListID = [2, 18];
        validArgs = false;
      }
    });
    return validArgs;
  }

  randomExtraction(message) {
    if (random.execute(this, message)) {
      assignParameters.execute(this);
      this.finished = false;
      return true;
    }
    return false;
  }

  getRole(player) {
    return this.playerList.get(player);
  }

  getPlayerList() {
    return this.playerList;
  }

  getPlayerNum() {
    return this.playerNum;
  }

  getRoleListID() {
    return this.roleListID;
  }

  reset() {
    //set the default values

    this.nightNum = 0;
    this.playerNum = -1;
    this.auraType = false;
    this.playerList = new Map();
    this.playerDying = [];
    this.roleListID = [];
    this.nightOrder = [];
    this.burnedPlayer = null;
    this.numberOfVotes = 0;
    this.ballottaggio = [];
    this.numberOfDeadPlayer = 0;
    this.finished = true;
  }
};
