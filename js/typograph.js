//
// Typograph.js by Kirill Chugreev 2015
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
                            var result = $(this).text().replace(/(^)\x22(\s)/g, '$1&raquo;$2').replace(/(^|\s|\()"/g, "$1&laquo;").replace(/"(\;|\!|\?|\:|\.|\,|$|\)|\s)/g, "&raquo;$1")
                            $(this).after(result).remove();
                        } else {
                            htmlreplace(this);
                        }
                        ;
                    });
                };
            });

            var text = $(this).html();
            var typos = [
                [/\s+\(/g, '<span class="typograph_sbrace"> </span><span class="typograph_hbrace">(</span>'],
                [/\s+'/g, '<span class="typograph_squot"> </span><span class="typograph_hquot">\'</span>'],
                [/\s+"/g, '<span class="typograph_sdquot"> </span><span class="typograph_hdquot">"</span>'],
                [/\s+(«|&laquo;)/g, '<span class="typograph_slaquot"> </span><span class="typograph_hlaquot">$1</span>'],
                [/\s+„/g, '<span class="typograph_slquot"> </span><span class="typograph_hlquot">„</span>'],
                [/\s+\*/g, '<span class="typograph_sasterisk"> </span><span class="typograph_hasterisk">*</span>'],
                [/\s+\+/g, '<span class="typograph_splus"> </span><span class="typograph_hplus">+</span>'],
                [/\s+-\s+/g, ' – '],
                [/[A-ZА-ЯЁ]{2,}/g, '<span class="typograph_capitel">$&</span>'],
                [/(\s[a-zA-Zа-яА-ЯёЁ]{1,3})\s([a-zA-Zа-яА-ЯёЁ]+)/g, '$1&nbsp;$2'],
                [/([A-ZА-ЯЁ]{1}\.)\s/g, '$1<span class="typograph_halfspace">&nbsp;</span>'],
                [/(\d{5,})\s([a-zA-Zа-яАЯёЁ]+)/g, '$1&nbsp;$2'],
                [/\.\.\./g, '…']
            ];

            for (var i = 0, len = typos.length; i < len; ++i) {
                text = text.replace(typos[i][0], typos[i][1]);
            }

            text = text.replace(/\d{5,}/g, function (needle, offset, str) {
                return '<span class="typograph_nobreak">' + needle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '<span class="typograph_thsep"></span>') + '</span>';
            });

            $(this).html(text);

        });
    });
} else {
    console.log('Typograph.js: no jQuery, can not work');
}