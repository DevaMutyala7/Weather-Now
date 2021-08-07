const CACHENAME = 'static-cache-v1'

const filesToCache = [
    'index.html',
    'offline.html'
]


//install
self.addEventListener('install',(e)=>{
    e.waitUntil(caches.open(CACHENAME)
        .then(cache=> {
            return cache.addAll(filesToCache)
        })
    )
})


//activate
self.addEventListener('activate',event=>{
    let cahceList = [CACHENAME,DYNAMICCACHE]
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=> {
                    console.log(cache)
                    if(!cahceList.includes(cache))
                    {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})


//fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});


