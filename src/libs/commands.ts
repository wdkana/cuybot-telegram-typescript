import { commandPrefix } from "./constants";

type FilteredCommands = {
    keyword: string;
    type: "only" | "after";
};

function filtered({ keyword, type }: FilteredCommands): RegExp {
    if (type === "only") {
        return new RegExp(`^${commandPrefix}${keyword}$`);
    }
    if (type === "after") {
        return new RegExp(`^${commandPrefix}${keyword}(.+)`);
    }

    throw new Error("Invalid type");
}

const commands = {
    quake: filtered({ keyword: "gempa", type: "only" }),
    greeting: filtered({ keyword: "halo", type: "only" }),
    quotes: filtered({ keyword: "quotes", type: "only" }),
    news: filtered({ keyword: "news", type: "only" }),
    help: filtered({ keyword: "help", type: "only" }),
    follow: filtered({ keyword: "follow", type: "after" }),
    avatar: filtered({ keyword: "avatar", type: "after" }),
};

export default commands
