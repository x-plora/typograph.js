//
// Typograph.js v0.1 2015
//
// programmer - Kirill Chugreev
// artistic director - Sergey Chikin
//
if (window.jQuery) {
    $(document).ready(function () {
        $('.do_typography').each(function () {
            $(this).each(function () {
                htmlreplace($(this));
                function htmlreplace(element) {
                    if (!element) element = document.body;
                    var nodes = $(element).contents().each(function () {
                        if (this.nodeType == Node.TEXT_NODE) {
                            var result = $(this).text().replace(/(^)\x22(\s)/gi, '$1&raquo;$2').replace(/(^|\s|\()"/gi, "$1&laquo;").replace(/"(\;|\!|\?|\:|\.|\,|$|\)|\s)/gi, "&raquo;$1")
                            $(this).after(result).remove();
                        } else {
                            htmlreplace(this);
                        }
                        ;
                    });
                };
            });

            var text = $(this).html();

            text = text.replace(/\s[a-zA-Zа-яА-ЯёЁ]*[A-ZА-ЯЁ]{2,}[a-zA-Zа-яА-ЯёЁ]*[\s\.,:;]/g, function (needle, offset, str) {
                return needle.replace(/[A-ZА-ЯЁ]+/g,'<span class="typograph_capitel">$&</span>');
            });

            var typographics = [
                [/\([cс]\)/gi, '©'],
                [/\([r]\)/gi, '®'],
                [/®\s+/g,'©&nbsp;'],
                [/\s+®/g,'&nbsp;®'],
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
                [/(\s|\(|>)(и|а|но|да|или|либо|в|из|от|до|к|перед|у|за|с)\s([a-zA-Zа-яА-ЯёЁ0-9]+|<\w+)/gi, '$1$2&nbsp;$3'],
                [/([A-ZА-ЯЁ]{1}[a-zа-яё]?\.)\s+/g, '$1<span class="typograph_halfspace">&nbsp;</span>'],
                [/(\d{5,})\s([a-zA-Zа-яАЯёЁ]+)/g, '$1&nbsp;$2'],
                [/\.\.\./g, '…'],
                [/(\d+)\s+([a-zA-Zа-яА-ЯёЁ])/g, '$1&nbsp;$2'],
            ];

            for (var i = 0, len = typographics.length; i < len; ++i) {
                text = text.replace(typographics[i][0], typographics[i][1]);
            }

            text = text.replace(/\d{5,}/gi, function (needle, offset, str) {
                return '<span class="typograph_nobreak">' + needle.toString().replace(/\B(?=(\d{3})+(?!\d))/gi, '<span class="typograph_thsep"></span>') + '</span>';
            });
            $(this).html(text);

        });
    });
} else {
    console.log('Typograph.js: no jQuery, can not work');
}