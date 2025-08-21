document.addEventListener('LoadedFromTransition', function () {

    const legalSnipetScriptCreation = (snippet) => {
        
        scripts = snippet.getElementsByTagName('script');

        scriptOne = document.createElement('script');
        scriptTwo = document.createElement('script');

        scriptOne.src = scripts[0].getAttribute('src');
        scriptOne.id = scripts[0].getAttribute('id');
        scriptOne.textContent = scripts[0].innerHTML;

        scriptTwo.textContent = scripts[1].innerHTML;

        document.head.appendChild(scriptOne);
        document.head.appendChild(scriptTwo);
    };
    

	const legalSnippet = document.getElementsByClassName('wp-block-tbwa-blocks-legal-snippet');

    if ( legalSnippet.length > 0 ) {
        for (let i = 0; i < legalSnippet.length; i++) {
            legalSnipetScriptCreation(legalSnippet[i]);
        };
    };

}, false);