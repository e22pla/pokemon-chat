ig.module( 'game.levels.lab' )
.requires('impact.image','game.entities.player','game.entities.exit','game.entities.exit','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign','game.entities.sign')
.defines(function(){
LevelLab=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":128,"y":128},{"type":"EntityExit","x":96,"y":192,"settings":{"map":"Town","me":1,"goTo":0}},{"type":"EntityExit","x":112,"y":192,"settings":{"map":"Town","me":0,"goTo":0}},{"type":"EntitySign","x":48,"y":112,"settings":{"msg":"It's crammed with books on POKéMON."}},{"type":"EntitySign","x":32,"y":112,"settings":{"msg":"It's crammed with books on POKéMON."}},{"type":"EntitySign","x":16,"y":112,"settings":{"msg":"It's crammed with books on POKéMON."}},{"type":"EntitySign","x":0,"y":112,"settings":{"msg":"It's crammed with books on POKéMON."}},{"type":"EntitySign","x":16,"y":16,"settings":{"msg":"It's crammed with books on POKéMON."}},{"type":"EntitySign","x":48,"y":16,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}},{"type":"EntitySign","x":64,"y":16,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}},{"type":"EntitySign","x":112,"y":16,"settings":{"msg":"It's a book that's too hard to read."}},{"type":"EntitySign","x":128,"y":16,"settings":{"msg":"It's a book that's too hard to read."}},{"type":"EntitySign","x":160,"y":112,"settings":{"msg":"It's a serious-looking machine.\\nThe PROF must use this for research."}},{"type":"EntitySign","x":176,"y":112,"settings":{"msg":"It's a serious-looking machine.\\nThe PROF must use this for research."}},{"type":"EntitySign","x":176,"y":144,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}},{"type":"EntitySign","x":16,"y":144,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}},{"type":"EntitySign","x":16,"y":160,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}},{"type":"EntitySign","x":176,"y":160,"settings":{"msg":"It's a PC used for research.\\nBetter not mess around with it."}}],"layer":[{"name":"below","width":13,"height":13,"linkWithCollision":false,"visible":1,"tilesetName":"media/laboratoryb.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[17,18,9,19,20,9,9,10,10,9,9,9,9],[25,26,11,145,146,11,12,13,14,15,11,11,16],[33,34,69,35,36,63,35,36,35,36,63,63,24],[41,3,3,3,66,3,3,3,3,3,3,3,32],[5,3,3,3,3,3,3,3,3,41,67,3,40],[5,3,3,3,3,3,3,3,3,64,64,3,48],[45,46,45,46,3,3,3,3,3,3,21,22,3],[53,54,53,54,3,3,3,3,3,3,29,30,31],[62,63,63,63,3,3,3,3,3,3,3,64,64],[5,49,3,3,3,3,3,3,3,3,3,60,47],[73,57,58,3,3,3,3,3,3,3,74,68,42],[73,65,3,3,3,3,3,3,3,3,3,76,67],[80,64,3,47,3,3,7,8,3,3,3,3,3]]},{"name":"above","width":13,"height":13,"linkWithCollision":false,"visible":1,"tilesetName":"media/laboratoryb.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":true,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,42,59,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[37,38,37,38,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":13,"height":13,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":true,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,1,1,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,1,1,0],[1,1,1,1,0,0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,1,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelLabResources=[new ig.Image('media/laboratoryb.png'), new ig.Image('media/laboratoryb.png')];
});