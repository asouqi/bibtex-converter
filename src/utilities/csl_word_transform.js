
const contributorsTransform = (contributors) => {
    return {
        "b:NameList": {
            "b:Person": contributors.map((person) => ({
                "b:Last": person.family || "",
                "b:First": person.given || "",
                "b:Middle": person.middle || ""
            }))
        }
    }
}

/** mapping from bibtex Json to word bibliography Xsd schema **/
export const bibTexWordMapping = {
    // Required fields
    "type": {
        xmlTag: "b:SourceType",
        transform: (cslType) => {
            const mapSourceType = {
                "book": "Book",
                "chapter": "BookSection",
                "article-journal": "JournalArticle",
                "report": "Report",
                "webpage": "InternetSite",
                "conference-paper": "ConferenceProceedings",
                "thesis": "Misc",
                "patent": "Patent",
                "motion-picture": "Film",
                "personal-communication": "Misc",
                "manual": "Misc",
                "map": "Art",
                "dataset": "Misc"
            };
            return mapSourceType[cslType] || "Misc";
        }
    },

    "id": { xmlTag: "b:Tag", transform: (val) => val }, // maps CSL id to Word Tag

    // Titles
    "title": { xmlTag: "b:Title", transform: (val) => val },
    "container-title": { xmlTag: "b:BookTitle", transform: (val) => val }, // e.g., journal/book container
    "title-short": { xmlTag: "b:ShortTitle", transform: (val) => val },
    "publisher": { xmlTag: "b:Publisher", transform: (val) => val },
    "publisher-place": { xmlTag: "b:City", transform: (val) => val },
    "edition": { xmlTag: "b:Edition", transform: (val) => val },
    "URL": { xmlTag: "b:URL", transform: (val) => val },
    "DOI": { xmlTag: "b:DOI", transform: (val) => val },
    "ISBN": { xmlTag: "b:ISBN", transform: (val) => val },
    "ISSN": { xmlTag: "b:StandardNumber", transform: (val) => val },
    "volume": { xmlTag: "b:Volume", transform: (val) => val },
    "issue": { xmlTag: "b:Issue", transform: (val) => val },
    "page": { xmlTag: "b:Pages", transform: (val) => val },
    "issued": {
        xmlTag: "b:Year",
        transform: (val) => {
            // CSL date is an object { "date-parts": [[YYYY, MM, DD]] }
            if (val?.["date-parts"]?.[0]?.[0]) return val["date-parts"][0][0].toString();
            return "";
        }
    },
    "accessed": {
        xmlTag: null, // we handle via transform
        transform: (val) => {
            const parts = val?.["date-parts"]?.[0] || [];
            return {
                "b:DayAccessed": parts[2]?.toString() || "",
                "b:MonthAccessed": parts[1]?.toString() || "",
                "b:YearAccessed": parts[0]?.toString() || ""
            };
        }
    },

    "author": {
        xmlTag: "b:Author",
        transform: contributorsTransform
    },
    "editor": {
        xmlTag: "b:Editor",
        transform: contributorsTransform
    },
    "translator": {
        xmlTag: "b:Translator",
        transform: contributorsTransform
    },

    // Misc / optional
    "note": { xmlTag: "b:Comments", transform: (val) => val },
    "medium": { xmlTag: "b:Medium", transform: (val) => val }
};

const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const contributorSet = new Set(['author', 'editor', 'translator'])

export const transformBibTexToWordSource = (bibTex) => {
    const source = {}

    for(const [key, mapping] of Object.entries(bibTexWordMapping)) {
        if (bibTex[key] !== undefined) {
            if (contributorSet.has(key)) {
                const contributor = {}
                contributor[mapping.xmlTag] = mapping.transform(bibTex[key])
                source['b:Author'] = contributor
            } else {
                source[mapping.xmlTag] = mapping.transform(bibTex[key])
            }
        }
    }

    if (!source["b:Tag"]) {
        source.Tag = uuid4()
    }

    source.Guid = uuid4()

    return source
}