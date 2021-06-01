import {ConvertToBibItem, ConvertToBibTex} from "../bib_converter";

describe('BiB Convert', () => {
    it('Convert BibTex To BibItem', () => {
        const bibtex1 = "@article{Sh:3,\n" +
            "author = {Shelah, Saharon},\n" +
            "ams-subject = {(02.50)},\n" +
            "journal = {Annals of Mathematical Logic},\n" +
            "review = {MR 44-2593},\n" +
            "pages = {69--118},\n" +
            "title = {{Finite diagrams stable in power}},\n" +
            "volume = {2},\n" +
            "year = {1970},\n" +
            "},\n"

        const bibtex2 = "@article{Steinbeck2003,\n" +
            "  author = {Steinbeck, Christoph and Han, Yongquan and Kuhn, Stefan and Horlacher, Oliver and Luttmann, Edgar and Willighagen, Egon},\n" +
            "  year = {2003},\n" +
            "  title = {{The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics.}},\n" +
            "  journal = {Journal of chemical information and computer sciences},\n" +
            "  volume = {43},\n" +
            "  number = {2},\n" +
            "  pages = {493--500},\n" +
            "  doi = {10.1021/ci025584y},\n" +
            "  isbn = {2214707786},\n" +
            "  issn = {0095-2338},\n" +
            "  pmid = {12653513},\n" +
            "  url = {http://www.ncbi.nlm.nih.gov/pubmed/12653513}\n" +
            "}"

        expect(ConvertToBibItem(bibtex1)).toMatch("\\bibitem{Sh:3}Shelah, S. {Finite diagrams stable in power}. {\\em Annals Of Mathematical Logic}. \\textbf{2} pp. 69--118 (1970)")
        expect(ConvertToBibItem(bibtex2)).toMatch("\\bibitem{Steinbeck2003}Steinbeck, C., Han, Y., Kuhn, S., Horlacher, O., Luttmann, E. & Willighagen, E. {The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics.}. {\\em Journal Of Chemical Information And Computer Sciences}. \\textbf{43}, 493--500 (2003)")

    })
});