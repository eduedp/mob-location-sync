module.exports = function MobLocationSync(mod) {
    const command = mod.command || mod.require.command;

    let enabled = false;

    mod.hook('S_EACH_SKILL_RESULT', 14, (e) => {
        if (enabled && e.reaction.enable && e.target != mod.game.me.gameId) {
            mod.send('S_INSTANT_MOVE', 3, {
                gameId: e.target,
                loc: e.reaction.loc,
                w: e.reaction.w,
            });
        }
    });

    command.add('msync', (type, value) => {
        switch (type) {
        case undefined:
            enabled = !enabled;
            command.message((enabled ? 'Enabled' : 'Disabled'));
            break;
        case 'on':
            enabled = true;
            command.message('Enabled');
            break;
        case 'off':
            enabled = false;
            command.message('Disabled');
            break;
        }
    });

    this.saveState = () => {
        const state = {
        };
        return state;
    };

    this.loadState = (state) => {
    };

    this.destructor = () => {
    };
};
