
const current_patch = getCurrentPatch();

export async function getChampions(search_q: string | null) {
    const url = 'https://ddragon.leagueoflegends.com/cdn/' + await current_patch + '/data/en_GB/champion.json';

    const res = await fetch(url)
        .then((res) => res.json());

    //makes the champ list out of the returned api data
    var champ_list = res.data;

    // makes the object into an array as we need that for the next step
    champ_list = Object.values(champ_list);

    //there there is a search_q then we want to filter the results
    if (search_q != null) {
        champ_list = filterChampsByid(champ_list, search_q);
    }

    //sets the image to use in the listing page
    champ_list.forEach(function (champ, key) {
        champ_list[key]['img'] = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champ.id + '_0.jpg';
    });

    return champ_list;
}

export async function getChampion(id: string | undefined) {
    const url = 'https://ddragon.leagueoflegends.com/cdn/' + await current_patch + '/data/en_GB/champion/' + id + '.json';

    const res = await fetch(url)
        .then((res) => res.json());

    // it returns the json and the data we want is in .data.id of the return
    // @ts-ignore
    const champ_data = res.data[id];
    // console.log(Object.keys(champ_data))
    // console.log(champ_data)
    console.log(champ_data.stats)

    return {
        name: champ_data.name,
        title: champ_data.title,
        img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + id + '_0.jpg',
        lore: champ_data.lore,
        stats: champ_data.stats,

    };
}

// get the current patch number from the static resource so that it can be used in other calls
export async function getCurrentPatch() {
    const versions_data_res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
        .then((res) => res.json());

    return versions_data_res[0];
}


// search all champs and matches there id's with the variable
function filterChampsByid(champ_array, s_string) {
    return champ_array.filter(o =>
        Object.keys(o).some(k => k === 'id' && o[k].toString().toLowerCase().includes(s_string.toString().toLowerCase())));
}