import { parse, HtmlGenerator } from 'latex.js';
import en from 'hyphenation.en-us'

export default async (latex) => {
    const CustomMacros = await (async function() {
        const args = CustomMacros.args = {}, prototype = CustomMacros.prototype;

        function CustomMacros(generator) {
            this.g = generator;
        }

        args['bf'] = ['HV']
        prototype['bf'] = function() {};

        args['bibitem'] = ['V', 'X', 'g', 'h'];
        prototype['bibitem'] = function(label,content) {
            const citation = this.g.create(this.g.listitem, [content])
            citation.style['list-style'] = 'decimal'
            return [citation]
        };

        args['thebibliography'] = ['V', 'X', 'items','n'];
        prototype['thebibliography'] = function(items, h) {
            if (arguments.length === 0) {
                this.g.startlist();
                this.g.stepCounter('@itemdepth');
                return;
            }

            const label = this.g.create(this.g.section)
            label.innerText = 'References'

            return [label,this.g.create(this.g.orderedList)];
        };

        prototype['endthebibliography'] = function() {
            this.g.endlist();
            this.g.setCounter('@itemdepth', this.g.counter('@itemdepth') - 1);
        };

        return CustomMacros;
    }())

    return parse(latex, { generator: new HtmlGenerator({
            hyphenate: false,
            bare: true,
            languagePatterns: en,
            CustomMacros
        })}).htmlDocument()
}