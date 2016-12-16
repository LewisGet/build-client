exports.items = [
    {name: "wool", id: 35, data: 0},
    {name: "orange wool", id: 35, data: 1},
    {name: "magenta wool", id: 35, data: 2},
    {name: "light blue wool", id: 35, data: 3},
    {name: "yellow wool", id: 35, data: 4},
    {name: "lime wool", id: 35, data: 5},
    {name: "pink wool", id: 35, data: 6},
    {name: "gray wool", id: 35, data: 7},
    {name: "white stained clay", id: 159, data: 0},
    {name: "orange stained clay", id: 159, data: 1},
    {name: "magenta stained clay", id: 159, data: 2},
    {name: "light blue stained clay", id: 159, data: 3},
    {name: "yellow stained clay", id: 159, data: 4},
    {name: "lime stained clay", id: 159, data: 5},
    {name: "pink stained clay", id: 159, data: 6},
    {name: "gray stained clay", id: 159, data: 7},
    {name: "light gray wool", id: 35, data: 8},
    {name: "cyan wool", id: 35, data: 9},
    {name: "purple wool", id: 35, data: 10},
    {name: "blue wool", id: 35, data: 11},
    {name: "brown wool", id: 35, data: 12},
    {name: "green wool", id: 35, data: 13},
    {name: "red wool", id: 35, data: 14},
    {name: "black wool", id: 35, data: 15},
    {name: "light gray stained clay", id: 159, data: 8},
    {name: "cyan stained clay", id: 159, data: 9},
    {name: "purple stained clay", id: 159, data: 10},
    {name: "blue stained clay", id: 159, data: 11},
    {name: "brown stained clay", id: 159, data: 12},
    {name: "green stained clay", id: 159, data: 13},
    {name: "red stained clay", id: 159, data: 14},
    {name: "black stained clay", id: 159, data: 15}
]

exports.getItemByName = function (name)
{
    var items = exports.items;

    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];

        if (item.name == name)
        {
            return item;
        }
    }

    return 0;
};

exports.getItemByIdData = function (id, data)
{
    var items = exports.items;

    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];

        if (item.id == id && item.data == data)
        {
            return item;
        }
    }

    return 0;
};

exports.getHumanizeName = function (item)
{
    var name = item.name;

    name.replace("stained clay", "sta");
    name.replace("wool", "w");

    return name;
};
