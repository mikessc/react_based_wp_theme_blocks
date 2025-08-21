
document.addEventListener('DOMContentLoaded', function () {

    const mapFieldsFromProvider = (provider, data) => {
        let newMapping = [];

        if (provider === 'recruitee') {
            for(let i=0; i<data.offers.length; i++) {
                newMapping.push({
                    jobTitle: data.offers[i].title,
                    url: data.offers[i].careers_url
                });
            }
        }

        if (provider === 'greenhouse') {
            for(let i=0; i<data.jobs.length; i++) {
                newMapping.push({
                    jobTitle: data.jobs[i].title,
                    url: data.jobs[i].absolute_url
                });
            }
        }

        return newMapping;
    };

    const jobs = async (jobBlock) => {
        const jobsListContainer = jobBlock.querySelector('.jobs__list');
        const dataSource = jobsListContainer.getAttribute('data-source');
        const dataURL = jobsListContainer.getAttribute('data-url');
        let dataToHTML = '', data = [];

        try {    
            const res = await fetch( dataURL );
            const resData = await res.json();

            data = mapFieldsFromProvider(dataSource, resData);

            if (!data) {
                return false;
            }

            dataToHTML = data.map((job) => {
                return `<li><a href=${job.url} target="_blank" class="h3">${job.jobTitle}</a></li>`;
            });
    
            if (dataToHTML.length > 0) {
                jobsListContainer.innerHTML = dataToHTML.join('');
            }
        } catch (error) {
            jobsListContainer.innerHTML = "<li>No data found</li>";
            console.log('Error getting data: ', error.message);
        }
    };
    
	const jobsBlock = document.getElementsByClassName('wp-block-tbwa-blocks-jobs');

    if ( jobsBlock ) {
        for (let i = 0; i < jobsBlock.length; i++) {
            jobs(jobsBlock[i]);
        };
    };

}, false);
