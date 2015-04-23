//
// Typograph.js v0.1 2015
//
// programmer - Kirill Chugreev
// artistic director - Sergey Chikin
//
if (window.jQuery) {
    $(document).ready(function () {
        $('.do_typography').each(function () {

            // кавычки

            $(this).each(function () {
                htmlreplace($(this));
                function htmlreplace(element) {
                    if (!element) element = document.body;
                    var nodes = $(element).contents().each(function () {
                        if (this.nodeType == Node.TEXT_NODE) {
                            var result = $(this).text()
                                .replace(/(^|\n|\s|—|-|\()"/g, "$1«").replace(/"($|\n|\s|—|-|\.|,|!|\?|:|;|\))/g, "»$1").replace(/«\)/g, "»)").replace(/«( ?)/g, "«").replace(/( ?)»/g, "»").replace(/>"/g, ">«").replace(/"</g, "»<").replace(/«""/g, "«««").replace(/«"/g, "««").replace(/""»/g, "»»»").replace(/"»/g, "»»").replace(/("{2}|"»)/g, "»»").replace(/$"/g, "«").replace(/([A-Za-zа-яА-ЯёЁ])'/g, "$1’")
                                .replace(/[a-zA-ZА-яёЁ]"-/g, "$1»-").replace(/-"[a-zA-ZА-яёЁ]/g, "-«$1")
                                .replace(/(^[^«»]*)"/g, "$1«").replace(/"([^«»]*$)/g, "»$1").replace(/«([^«»]*)"/g, "«$1»").replace(/"([^«»]*)»/g, "«$1»")
                            $(this).after(result).remove();
                        } else {
                            htmlreplace(this);
                        }

                    });
                }
            });

            var text = $(this).html();

            function replaceQuotes(beginPos, endPos) {
                var begin = "", inner, end = "";
                if (beginPos != 0) {
                    begin = text.substring(0, beginPos);
                }
                if (endPos != text.length - 1) {
                    end = text.substring(endPos + 1, text.length);
                }
                inner = text.substring(beginPos, endPos + 1);
                for (var i = 0; i < 32; ++i) {
                    inner = inner.replace(/«([^«»]*)«([^»]*)»/g, "«$1„$2“");
                    inner = inner.replace(/„([^„“]*)„([^“]*)“/g, "„$1¬$2‘");
                }
                return begin + inner + end;
            };

            var level = 0;
            for (var beginCnt = 0; beginCnt < text.length; ++beginCnt) {
                if (text.charAt(beginCnt) == '«') {
                    ++level;
                    for (var endCnt = beginCnt + 1; endCnt < text.length; ++endCnt) {
                        if (text.charAt(endCnt) == '«') {
                            ++level;
                        }
                        if (text.charAt(endCnt) == '»') {
                            --level;
                            if (level <= 0) {
                                text = replaceQuotes(beginCnt, endCnt);
                                beginCnt = endCnt;
                                break;
                            }
                        }
                    }
                    level = 0;
                }
            }
            // кавычки

            text = text.replace(/\s[a-zA-Zа-яА-ЯёЁ]*[A-ZА-ЯЁ]{2,}[a-zA-Zа-яА-ЯёЁ]*[\s\.,:;]/g, function (needle, offset, str) {
                return needle.replace(/[A-ZА-ЯЁ]+/g, '<span class="typograph_capitel">$&</span>');
            });


            var typographics = [
                [/\([cс]\)/gi, '©'],
                [/\([r]\)/gi, '®'],
                [/®\s+/g, '©&nbsp;'],
                [/\s+®/g, '&nbsp;®'],
                [/\s+\./g, '. '],
                [/\s+,/g, ', '],
                [/\+-/g, '±'],
                [/!=/g, '≠'],
                [/~=/g, '≈'],
                [/(<|&lt;)=/g, '≤'],
                [/(>|&gt;)=/g, '≥'],
                [/\s1\/2(\s|\.|,)/g, ' ½$1'],
                [/\s1\/4(\s|\.|,)/g, ' ¼$1'],
                [/\s3\/4(\s|\.|,)/g, ' ¾$1'],
                [/\s+\(/g, '<span class="typograph_sbrace"> </span><span class="typograph_hbrace">(</span>'],
                [/>\s+'/g, '><span class="typograph_hquot">\'</span>'],
                [/\s+'/g, '<span class="typograph_squot"> </span><span class="typograph_hquot">\'</span>'],
                [/>\s+"/g, '><span class="typograph_hdquot">"</span>'],
                [/\s+"/g, '<span class="typograph_sdquot"> </span><span class="typograph_hdquot">"</span>'],
                [/>\s+(«|&laquo;)/g, '><span class="typograph_hlaquot">$1</span>'],
                [/\s+(«|&laquo;)/g, '<span class="typograph_slaquot"> </span><span class="typograph_hlaquot">$1</span>'],
                [/\s+„/g, '<span class="typograph_slquot"> </span><span class="typograph_hlquot">„</span>'],
                [/\s+\*/g, '<span class="typograph_sasterisk"> </span><span class="typograph_hasterisk">*</span>'],
                [/\s+\+/g, '<span class="typograph_splus"> </span><span class="typograph_hplus">+</span>'],
                [/\s+-\s+/g, ' — '],
                [/\s+–\s+/g, ' — '],
                [/(\d+)-(\d+)/g, '$1—$2'],
                [/(\d+)–(\d+)/g, '$1—$2'],
                [/(\d+)x(\d+)/g, '$1×$2'],
                [/(\d+)\^(\d+)/g, '$1<sup><small>$2</small></sup>'],
                [/([a-zA-Zа-яА-ЯёЁ]+)-([a-zA-Zа-яА-ЯёЁ]+)/g, '<span class="typograph_nobreak">$1–$2</span>',true],
                [/([a-zA-Zа-яА-ЯёЁ]+)–([a-zA-Zа-яА-ЯёЁ]+)/g, '<span class="typograph_nobreak">$1–$2</span>',true],
                [/(\s|\(|>|&nbsp;)(и|а|но|да|или|либо|в|из|от|до|к|перед|у|за|с|не|по|о)\s([a-zA-Zа-яА-ЯёЁ0-9]+|<\w+)/gi, '$1$2&nbsp;$3'],
                [/([A-ZА-ЯЁ]{1}[a-zа-яё]?\.)\s+/g, '$1<span class="typograph_halfspace">&nbsp;</span>'],
                [/(\d{5,})\s+([a-zA-Zа-яАЯёЁ$]+)/g, '$1&nbsp;$2'],
                [/\.{3,4}/g, '…'],
                [/(\d+)\s+([a-zA-Zа-яА-ЯёЁ])/g, '$1&nbsp;$2'],
                [/(№)\s+(\d+)/g, '$1&nbsp;$2'],
                [/¬/g, ','], //восттанавливаем нижнюю одинарную лапку
                [/[…]+[a-zA-Zа-яА-ЯёЁ]+/g, '<span class="typograph_nobreak">$&</span>', true],
                [/\s+,/g, '<span class="typograph_squot"> </span><span class="typograph_hquot">,</span>'],
            ];

            for (var i = 0, len = typographics.length; i < len; ++i) {
                do {
                    var oText = text;
                    var done = false;
                    text = text.replace(typographics[i][0], typographics[i][1]);
                    done = oText == text;
                    if (typographics[i][2] === true) {
                        done = true;
                    }
                } while (!done);
            }

            do {
                var oText = text;
                text = text.replace(/\d{5,}/gi, function (needle, offset, str) {
                    return '<span class="typograph_nobreak">' + needle.toString().replace(/\B(?=(\d{3})+(?!\d))/gi, '<span class="typograph_thsep"></span>') + '</span>';
                });
            } while (oText != text);

            $(this).html(text);

        });
    });
} else {
    console.log('Typograph.js: no jQuery, can not work');
}