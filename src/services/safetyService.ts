export interface SafetyData {
  [key: string]: string;
}

export class SafetyService {
  private static readonly API_URL = 'http://localhost:3001/safety';

  // Keyword mapping for better matching
  private static readonly keywordMap: { [key: string]: string } = {
    'speed': 'speed_limit',
    'velocity': 'speed_limit',
    'fast': 'speed_limit',
    'fire': 'fire_safety',
    'fire safety': 'fire_safety',
    'extinguisher': 'fire_safety',
    'ppe': 'personal_protective_equipment',
    'helmet': 'personal_protective_equipment',
    'safety gear': 'personal_protective_equipment',
    'protective equipment': 'personal_protective_equipment',
    'alcohol': 'alcohol_policy',
    'drinking': 'alcohol_policy',
    'siren': 'emergency_siren',
    'emergency': 'assembly_point',
    'assembly': 'assembly_point',
    'health': 'health_safety_policy',
    'policy': 'health_safety_policy',
    'breach': 'safety_breach',
    'violation': 'safety_breach',
    'swa': 'swa',
    'stop work': 'swa',
    'tttc': 'tttc',
    'take time': 'tttc'
  };

  static async getSafetyData(): Promise<SafetyData> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch safety data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching safety data:', error);
      throw error;
    }
  }

  static normalizeKeyword(input: string): string {
    const normalized = input.toLowerCase().trim();
    return this.keywordMap[normalized] || normalized.replace(/\s+/g, '_');
  }

  // Replace the existing searchSafetyInfo method with this:

  static async searchSafetyInfo(keyword: string): Promise<string> {
    try {
      const safetyData = await this.getSafetyData();
      const normalizedKeyword = this.normalizeKeyword(keyword);

      // Find all matching keys
      const matchingResults: Array<{ key: string, value: string }> = [];

      // Direct match
      if (safetyData[normalizedKeyword]) {
        matchingResults.push({ key: normalizedKeyword, value: safetyData[normalizedKeyword] });
      }

      // Fuzzy search - check if keyword is contained in any key
      Object.keys(safetyData).forEach(key => {
        if (key !== normalizedKeyword && // Avoid duplicates
          (key.includes(normalizedKeyword) || normalizedKeyword.includes(key.replace(/_/g, ' ')))) {
          matchingResults.push({ key: key, value: safetyData[key] });
        }
      });

      if (matchingResults.length === 0) {
        return `I couldn't find information about "${keyword}". Try keywords like: speed, fire safety, ppe, alcohol, emergency, swa, tttc, etc.`;
      }

      if (matchingResults.length === 1) {
        return matchingResults[0].value;
      }

      // Multiple results - format them
      let response = `"Response"\n`;
      matchingResults.forEach((item, index) => {
        const displayKey = item.key.replace(/_/g, ' ').toUpperCase();
        response += `${index + 1}. ${displayKey}: ${item.value}\n`;
      });

      return response;
    } catch (error) {
      return 'Sorry, I\'m having trouble accessing the safety database. Please make sure the JSON server is running.';
    }
  }

  static getAllTopics(): string[] {
    return [
      'Personal Protective Equipment (PPE)',
      'Speed Limit',
      'Emergency Siren',
      'Assembly Point',
      'Health Safety Policy',
      'Alcohol Policy',
      'Fire Safety',
      'Safety Breach',
      'SWA (Stop Work Authority)',
      'TTTC (Take Time Take Charge)'
    ];
  }
}
