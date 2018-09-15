const Discord = require("discord.js");
const prefix = ">";
const fetch = require('node-fetch');
var SteamApi = require('steam-api');
var user = new SteamApi.User(process.env.STEAM_KEY);
const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_KEY);
const client = new Discord.Client();
client.on("ready", () => {
    client.user.setPresence({ game: { name: 'Team Fortress 2' }, status: "idle" })
    .then()
    .catch(console.error);
});
client.on("message", async message => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.channel.type != 'dm'){
    if((message.content.indexOf(prefix) == 0)){
        if(command === "stats"){
            if(!args[1]) var usern = message.member.displayName.toString();
            else var usern = args[1]
            if(!args[0]) var type = "overall"
            else var type = args[0]
            user.ResolveVanityUrl(usern).then(result => {
            var id = result.toString();
            steam.getUserSummary(id).then(summary => {
            steam.getUserRecentGames(id).then(games => {
                if(games.length < 1 && type === "overall" || games.length <1 && type === "hrs" || games.length <1 && type === "ov" || games.length <1 && type === "hours"){
                    const embed = new Discord.RichEmbed()
                    .setAuthor("ERROR!")
                    .setColor(0xe03a00)
                    .setDescription(`${summary.nickname} (${usern})'s TF2 stats are inaccessible! \n \n [to view your stats, set your game details to public]`)
                    .setFooter("bumble#8029", "https://pre00.deviantart.net/b1bb/th/pre/i/2013/012/f/3/big_fat_bee_by_luzenrique-d5r8gxz.jpg")
                    .setThumbnail(summary.avatar.large);
                    return message.channel.send({embed});}
            for(var i = 0; i < games.length; i++){
            if(games[i].name == 'Team Fortress 2'){
                    var hours = parseInt(games[i].playTime/60);
                    var minutes = parseInt(60 * ((games[i].playTime/60)%1));
                }
            }
            //var id = 76561198133867907;
            fetch(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=${process.env.STEAM_KEY}&steamid=${id}&format=json`)
                .then(res => res.json())
                .then(json => {
                    for(var i = 0; i < json.playerstats.stats.length; i++){
                        //hours
                        if(json.playerstats.stats[i].name == "Scout.accum.iPlayTime") var sco_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iPlayTime") var sol_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iPlayTime") var pyr_hours = json.playerstats.stats[i].value / 3600;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iPlayTime") var dem_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iPlayTime") var hev_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iPlayTime") var eng_hours = json.playerstats.stats[i].value / 3600; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iPlayTime") var med_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iPlayTime") var sni_hours = json.playerstats.stats[i].value / 3600;
                        if(json.playerstats.stats[i].name == "Spy.accum.iPlayTime") var spy_hours = json.playerstats.stats[i].value / 3600; 
                        var total_hours = (sco_hours + sol_hours + spy_hours + pyr_hours + med_hours + dem_hours+ hev_hours + eng_hours + sni_hours);
                        var ghours = parseInt(total_hours);
                        var gminutes = parseInt(60 * ((total_hours)%1));
                        //kills
                        if(json.playerstats.stats[i].name == "Scout.accum.iNumberOfKills") var sco_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iNumberOfKills") var sol_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iNumberOfKills") var pyr_kills = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iNumberOfKills") var dem_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iNumberOfKills") var hev_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iNumberOfKills") var eng_kills = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iNumberOfKills") var med_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Medic.accum.iHealthPointsHealed") var med_heals = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iNumberOfKills") var sni_kills = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iNumberOfKills") var spy_kills = json.playerstats.stats[i].value; 
                        var total_kills = (sco_kills + sol_kills + spy_kills + pyr_kills + med_kills + dem_kills + hev_kills + eng_kills + sni_kills)
                        //damage
                        if(json.playerstats.stats[i].name == "Scout.accum.iDamageDealt") var sco_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iDamageDealt") var sol_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iDamageDealt") var pyr_dmg = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iDamageDealt") var dem_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iDamageDealt") var hev_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iDamageDealt") var eng_dmg = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iDamageDealt") var med_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Medic.accum.iNumInvulnerable") var med_ubers = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iDamageDealt") var sni_dmg = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iDamageDealt") var spy_dmg = json.playerstats.stats[i].value; 
                        var total_dmg = (sco_dmg + sol_dmg + spy_dmg + pyr_dmg + med_dmg + dem_dmg + hev_dmg + eng_dmg + sni_dmg);
                        //assists
                        if(json.playerstats.stats[i].name == "Scout.accum.iKillAssists") var sco_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iKillAssists") var sol_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iKillAssists") var pyr_asi = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iKillAssists") var dem_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iKillAssists") var hev_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iKillAssists") var eng_asi = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iKillAssists") var med_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iKillAssists") var sni_asi = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iKillAssists") var spy_asi = json.playerstats.stats[i].value; 
                        var total_asi = (sco_asi + sol_asi + spy_asi + pyr_asi + med_asi + dem_asi + hev_asi + eng_asi + sni_asi);
                        //points
                        if(json.playerstats.stats[i].name == "Scout.accum.iPointsScored") var sco_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iPointsScored") var sol_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iPointsScored") var pyr_pnt = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iPointsScored") var dem_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iPointsScored") var hev_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iPointsScored") var eng_pnt = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iPointsScored") var med_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iPointsScored") var sni_pnt = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iPointsScored") var spy_pnt = json.playerstats.stats[i].value; 
                        var total_pnt = (sco_pnt + sol_pnt + spy_pnt + pyr_pnt + med_pnt + dem_pnt + hev_pnt + eng_pnt + sni_pnt);
                        //caps
                        if(json.playerstats.stats[i].name == "Scout.accum.iPointCaptures") var sco_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iPointCaptures") var sol_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iPointCaptures") var pyr_cap = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iPointCaptures") var dem_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iPointCaptures") var hev_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iPointCaptures") var eng_cap = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iPointCaptures") var med_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iPointCaptures") var sni_cap = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iPointCaptures") var spy_cap = json.playerstats.stats[i].value; 
                        var total_cap = (sco_cap + sol_cap + spy_cap + pyr_cap + med_cap + dem_cap + hev_cap + eng_cap + sni_cap);
                        //defenses
                        if(json.playerstats.stats[i].name == "Scout.accum.iPointDefenses") var sco_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iPointDefenses") var sol_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iPointDefenses") var pyr_def = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iPointDefenses") var dem_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iPointDefenses") var hev_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iPointDefenses") var eng_def = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iPointDefenses") var med_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iPointDefenses") var sni_def = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iPointDefenses") var spy_def = json.playerstats.stats[i].value; 
                        var total_def = (sco_def + sol_def + spy_def + pyr_def + med_def + dem_def + hev_def + eng_def + sni_def);
                        //destructions
                        if(json.playerstats.stats[i].name == "Scout.accum.iBuildingsDestroyed") var sco_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Soldier.accum.iBuildingsDestroyed") var sol_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Pyro.accum.iBuildingsDestroyed") var pyr_des = json.playerstats.stats[i].value;  
                        if(json.playerstats.stats[i].name == "Demoman.accum.iBuildingsDestroyed") var dem_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Heavy.accum.iBuildingsDestroyed") var hev_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Engineer.accum.iBuildingsDestroyed") var eng_des = json.playerstats.stats[i].value; 
                        if(json.playerstats.stats[i].name == "Medic.accum.iBuildingsDestroyed") var med_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Sniper.accum.iBuildingsDestroyed") var sni_des = json.playerstats.stats[i].value;
                        if(json.playerstats.stats[i].name == "Spy.accum.iBuildingsDestroyed") var spy_des = json.playerstats.stats[i].value; 
                        var total_des = (sco_des + sol_des + spy_des + pyr_des + med_des + dem_des + hev_des + eng_des + sni_des);
                    }
                    var typearr = ["overall", "hrs", "hours", "ov", "damage", "dmg", "kills", "support", "sp", "points", "obj", "scout", "soldier", "solly", "pyro", "demoman", "demo", "heavy", "engineer", "engie", "engi", "medic", "med", "sniper", "spy"];
                    if(type === "overall" || type === "hrs" || type === "hours" || type === "ov")
                    message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: OVERALL`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "overall time",
                            value: "~" + hours.toLocaleString() + " hours, " + minutes + " minutes."
                        },{
                            name: "in-game time",
                            value: "~" + ghours.toLocaleString() + " hours, " + gminutes + " minutes."
                        }]
                      }});
                    if(type === "damage" || type === "dmg" || type === "kills")
                    message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: DAMAGE`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "total kills",
                            value: total_kills.toLocaleString()
                        },{
                            name: "total damage",
                            value: total_dmg.toLocaleString() + " (" + (Math.round(total_dmg / (total_hours*60))).toLocaleString() + "dpm)"
                        },{
                            name: "total assists",
                            value: total_asi.toLocaleString()
                        }]
                      }});
                      if(type === "support" || type === "sp" || type === "points" || type === "obj")
                       message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: SUPPORT`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "total points",
                            value: total_pnt.toLocaleString()
                        },{
                            name: "total objectives",
                            value: total_cap.toLocaleString() + " caps, " + total_def.toLocaleString() + " defenses"
                        },{
                            name: "total buildings destroyed",
                            value: total_des.toLocaleString()
                        }]
                      }});
                      if(type === "scout")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: SCOUT`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(sco_hours).toLocaleString() + " hours, " + parseInt(60 * ((sco_hours)%1)) + " minutes. " + "(" + parseInt(10*((sco_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: sco_kills.toLocaleString() + " (" + parseInt(sco_dmg/sco_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: sco_dmg.toLocaleString() + " (" + parseInt(sco_dmg/(sco_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "soldier" || type === "solly")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: SOLDIER`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(sol_hours).toLocaleString() + " hours, " + parseInt(60 * ((sol_hours)%1)) + " minutes. " + "(" + parseInt(10*((sol_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: sol_kills.toLocaleString() + " (" + parseInt(sol_dmg/sol_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: sol_dmg.toLocaleString() + " (" + parseInt(sol_dmg/(sol_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "pyro")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: PYRO`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(pyr_hours).toLocaleString() + " hours, " + parseInt(60 * ((pyr_hours)%1)) + " minutes. " + "(" + parseInt(10*((pyr_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: pyr_kills.toLocaleString() + " (" + parseInt(pyr_dmg/pyr_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: pyr_dmg.toLocaleString() + " (" + parseInt(pyr_dmg/(pyr_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "demo" || type === "demoman")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: DEMOMAN`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(dem_hours).toLocaleString() + " hours, " + parseInt(60 * ((dem_hours)%1)) + " minutes. " + "(" + parseInt(10*((dem_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: dem_kills.toLocaleString() + " (" + parseInt(dem_dmg/dem_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: dem_dmg.toLocaleString() + " (" + parseInt(dem_dmg/(dem_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "heavy")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: HEAVY`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(hev_hours).toLocaleString() + " hours, " + parseInt(60 * ((hev_hours)%1)) + " minutes. " + "(" + parseInt(10*((hev_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: hev_kills.toLocaleString() + " (" + parseInt(hev_dmg/hev_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: hev_dmg.toLocaleString() + " (" + parseInt(hev_dmg/(hev_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "engineer" || type === "engi" || type === "engie")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: ENGINEER`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(eng_hours).toLocaleString() + " hours, " + parseInt(60 * ((eng_hours)%1)) + " minutes. " + "(" + parseInt(10*((eng_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: eng_kills.toLocaleString() + " (" + parseInt(eng_dmg/eng_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: eng_dmg.toLocaleString() + " (" + parseInt(eng_dmg/(eng_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "medic" || type === "med")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: MEDIC`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(med_hours).toLocaleString() + " hours, " + parseInt(60 * ((med_hours)%1)) + " minutes. " + "(" + parseInt(10*((med_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total healing",
                            value: med_heals.toLocaleString() + " (" + parseInt(med_heals/(med_hours*60)) + "hpm)"
                        },{
                            name: "total ubers",
                            value: med_ubers.toLocaleString() + " (" + parseInt(med_heals/med_ubers) + "hpu)"
                        }]
                      }});
                      if(type === "sniper")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: SNIPER`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(sni_hours).toLocaleString() + " hours, " + parseInt(60 * ((sni_hours)%1)) + " minutes. " + "(" + parseInt(10*((sni_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: sni_kills.toLocaleString() + " (" + parseInt(sni_dmg/sni_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: sni_dmg.toLocaleString() + " (" + parseInt(sni_dmg/(sni_hours*60)) + "dpm)"
                        }]
                      }});
                      if(type === "spy")
                      message.channel.send({embed: {
                        color: 0xe03a00,
                        author: {
                            name: `${summary.nickname.toUpperCase()}'S TF2 STATS: SPY`,
                            icon_url: summary.avatar.large
                        },
                        fields: [{
                            name: "time played",
                            value: (parseInt(spy_hours).toLocaleString() + " hours, " + parseInt(60 * ((spy_hours)%1)) + " minutes. " + "(" + parseInt(10*((spy_hours/total_hours)*100))/10 + "%)")
                        },{
                            name: "total kills",
                            value: spy_kills.toLocaleString() + " (" + parseInt(spy_dmg/spy_kills) + "dpk)" 
                        },{
                            name: "total damage",
                            value: spy_dmg.toLocaleString() + " (" + parseInt(spy_dmg/(spy_hours*60)) + "dpm)"
                        }]
                      }});
                      if(typearr.indexOf(type) < 0){
                        const embed = new Discord.RichEmbed()
                        .setAuthor("ERROR!")
                        .setColor(0xe03a00)
                        .setDescription(`${type} is not a valid search! \n \n [refer to \`>help\` for the list of things you can search]`)
                        .setFooter("bumble#8029", "https://pre00.deviantart.net/b1bb/th/pre/i/2013/012/f/3/big_fat_bee_by_luzenrique-d5r8gxz.jpg")
                        .setThumbnail(client.user.avatarURL);
                        return message.channel.send({embed});
                      }
                    }).catch(err => {
                        if(summary.personaState == 0) var diag = "to view your stats, set your profile to public"
                        else var diag = "to view your stats, set your game details to public";
                        const embed = new Discord.RichEmbed()
                        .setAuthor("ERROR!")
                        .setColor(0xe03a00)
                        .setDescription(`${summary.nickname} (${usern})'s TF2 stats are inaccessible! \n \n [${diag}]`)
                        .setFooter("bumble#8029", "https://pre00.deviantart.net/b1bb/th/pre/i/2013/012/f/3/big_fat_bee_by_luzenrique-d5r8gxz.jpg")
                        .setThumbnail(summary.avatar.large);
                        return message.channel.send({embed});
                    })
                });
            });
        }).catch(err => {
            if(isNaN(usern)) var diag = "[you may have made a typo]"
            if(!isNaN(usern)) var diag = "[you may not have set a vanity ID]"
            const embed = new Discord.RichEmbed()
                        .setAuthor("ERROR!")
                        .setColor(0xe03a00)
                        .setDescription(`${usern} is not a valid vanity ID! \n \n ${diag}`)
                        .setFooter("bumble#8029", "https://pre00.deviantart.net/b1bb/th/pre/i/2013/012/f/3/big_fat_bee_by_luzenrique-d5r8gxz.jpg")
                        .setThumbnail(client.user.avatarURL);
                        return message.channel.send({embed});
            })
        }
    }}    
})
client.login(process.env.BOT_TOKEN);
