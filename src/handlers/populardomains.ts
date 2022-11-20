//import Store from '../posts_store';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//PopularDomainsKV: KVNamespace
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

const PopularDomainsSource = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/top-domain.csv";

const PopularDomainsSourceData = async () => {
    return await fetchCSVBasedOnURL(PopularDomainsSource);
};

async function fetchCSVBasedOnURL(url: string): Promise<Response> {

    const init = {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }

        var finalresp = null;

        const response = await fetch(PopularDomainsSource, init).then(res => res.text()).then(d => {
                var lines = d.split("\n");

                var result = [];

                var headers = lines[0].split(",");

                for (var i = 1; i < lines.length-1; i++) {

                    var obj : any = {};
                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length; j++) {
                        let currentlinestring: string = currentline[j];
                        let headersString: string = headers[j];

                        headersString = headersString.replace("\r", "");
                        currentlinestring = currentlinestring.replace("\r", "");

                        obj[headersString] = currentlinestring;
                    }

                    result.push(obj);
                }

                var finalResult = { "rankingEntries": result };

                finalresp =  JSON.stringify(finalResult);
            });
        
        return new Response(finalresp);
}

export default PopularDomainsSourceData;