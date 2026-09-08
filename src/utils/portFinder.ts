// filepath: /src/utils/portFinder.ts
import { PortEntry } from '../types/freight';
import portsData from './ports.json';

export const COMPREHENSIVE_PORTS: PortEntry[] = portsData as PortEntry[];

export function findSmartNearestPort(inputAddress: string): PortEntry | null {
  if (!inputAddress || inputAddress.trim().length < 2) return null;
  const query = inputAddress.toLowerCase().trim();

  const matchedByKeyword = COMPREHENSIVE_PORTS.find(p => 
    p.keywords.some(k => query.includes(k) || k.includes(query))
  );
  if (matchedByKeyword) return matchedByKeyword;

  const matchedByNameOrCode = COMPREHENSIVE_PORTS.find(p => 
    p.name.toLowerCase().includes(query) ||
    p.port.toLowerCase().includes(query) ||
    p.code.toLowerCase() === query ||
    query.includes(p.country.toLowerCase())
  );
  
  return matchedByNameOrCode || null;
}
