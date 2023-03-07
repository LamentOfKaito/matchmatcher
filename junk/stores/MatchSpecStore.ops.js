const ops = {
    unsetChampion(name) {
        const i = state.participants.findIndex(p => p.championName === championName);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'championName'), '', state);
            set(updated);
        }
    },

    unsetRole(teamId, roleName) {
        const i = state.participants.findIndex(p => p.teamId === teamId && p.roleName === roleName);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'role'), [], state)
            set(updated);
        }
    },

    setItems(pIndex, items) {
        const updated = R.set(lensParticipant(i, 'items'), [], state)
        set(updated);
    }
}
