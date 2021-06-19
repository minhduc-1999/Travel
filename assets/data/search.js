export const Search2 = {
  authenticationResultCode: 'ValidCredentials',
  brandLogoUri: 'http://dev.virtualearth.net/Branding/logo_powered_by.png',
  copyright:
    'Copyright © 2021 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.',
  resourceSets: [
    {
      estimatedTotal: 2,
      resources: [
        {
          __type:
            'Location:http://schemas.microsoft.com/search/local/ws/rest/v1',
          bbox: [
            10.082658767700195,
            105.54175567626953,
            11.468179702758789,
            107.82376861572266,
          ],
          name: 'Ho Chi Minh City, Vietnam',
          point: {
            type: 'Point',
            coordinates: [10.776530265808105, 106.70097351074219],
          },
          address: {
            adminDistrict: 'Ho Chi Minh City',
            countryRegion: 'Vietnam',
            formattedAddress: 'Ho Chi Minh City, Vietnam',
            locality: 'Ho Chi Minh City',
          },
          confidence: 'High',
          entityType: 'PopulatedPlace',
          geocodePoints: [
            {
              type: 'Point',
              coordinates: [10.776530265808105, 106.70097351074219],
              calculationMethod: 'Rooftop',
              usageTypes: ['Display'],
            },
          ],
          matchCodes: ['Good'],
        },
        {
          __type:
            'Location:http://schemas.microsoft.com/search/local/ws/rest/v1',
          bbox: [
            20.974586486816406,
            105.78898620605469,
            21.068710327148438,
            105.87332916259766,
          ],
          name: 'Hanoi, Vietnam',
          point: {
            type: 'Point',
            coordinates: [21.028278350830078, 105.8538818359375],
          },
          address: {
            adminDistrict: 'Hanoi',
            countryRegion: 'Vietnam',
            formattedAddress: 'Hanoi, Vietnam',
            locality: 'Hanoi',
          },
          confidence: 'High',
          entityType: 'PopulatedPlace',
          geocodePoints: [
            {
              type: 'Point',
              coordinates: [21.028278350830078, 105.8538818359375],
              calculationMethod: 'Rooftop',
              usageTypes: ['Display'],
            },
          ],
          matchCodes: ['Good'],
        },
        {
          __type:
            'Location:http://schemas.microsoft.com/search/local/ws/rest/v1',
          bbox: [
            17.674203872680664,
            -65.085494995117188,
            18.4139347076416,
            -64.564529418945313,
          ],
          name: 'US Virgin Islands',
          point: {
            type: 'Point',
            coordinates: [18.327226638793945, -64.916915893554687],
          },
          address: {
            countryRegion: 'US Virgin Islands',
            formattedAddress: 'US Virgin Islands',
          },
          confidence: 'Low',
          entityType: 'CountryRegion',
          geocodePoints: [
            {
              type: 'Point',
              coordinates: [18.327226638793945, -64.916915893554687],
              calculationMethod: 'Rooftop',
              usageTypes: ['Display'],
            },
          ],
          matchCodes: ['UpHierarchy'],
        },
      ],
    },
  ],
  statusCode: 200,
  statusDescription: 'OK',
  traceId:
    '4882e16851ce429a825c472220647e4d|HK00000C06|0.0.0.1|Ref A: D0FB3C74D0694BDFBA7C88580B613C36 Ref B: HK2EDGE1116 Ref C: 2021-06-19T05:12:48Z',
};
export default [
  {
    authenticationResultCode: 'ValidCredentials',
    brandLogoUri: 'http://dev.virtualearth.net/Branding/logo_powered_by.png',
    copyright:
      'Copyright © 2021 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.',
    resourceSets: [
      {
        estimatedTotal: 1,
        resources: [
          {
            __type:
              'Location:http://schemas.microsoft.com/search/local/ws/rest/v1',
            bbox: [
              10.082658767700195,
              105.54175567626953,
              11.468179702758789,
              107.82376861572266,
            ],
            name: 'Ho Chi Minh City, Vietnam',
            point: {
              type: 'Point',
              coordinates: [10.776530265808105, 106.70097351074219],
            },
            address: {
              adminDistrict: 'Ho Chi Minh City',
              countryRegion: 'Vietnam',
              formattedAddress: 'Ho Chi Minh City, Vietnam',
              locality: 'Ho Chi Minh City',
            },
            confidence: 'High',
            entityType: 'PopulatedPlace',
            geocodePoints: [
              {
                type: 'Point',
                coordinates: [10.776530265808105, 106.70097351074219],
                calculationMethod: 'Rooftop',
                usageTypes: ['Display'],
              },
            ],
            matchCodes: ['Good'],
          },
        ],
      },
    ],
    statusCode: 200,
    statusDescription: 'OK',
    traceId:
      '1e7acb0e4ce34cc9bef0913702bb9b56|HK00001E35|0.0.0.1|Ref A: 81ED708696304B039F9ABA8F8C525A55 Ref B: HK2EDGE0915 Ref C: 2021-06-19T05:00:29Z',
  },
];
