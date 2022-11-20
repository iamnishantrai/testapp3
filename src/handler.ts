import { Router } from 'itty-router';

import AttackLayer3SourceData from './handlers/attacklayer';
import PopularDomainsSourceData from './handlers/populardomains';
import TrafficChangeSourceData from './handlers/trafficchange';

const router = Router();
router
.get('/traffic-change', TrafficChangeSourceData)
.get('/popular-domains', PopularDomainsSourceData)
.get('/attack-layer3', AttackLayer3SourceData)
.get('*', () => new Response('Unsupported end point', { status: 404 }));

export const handleRequest = request => router.handle(request);
