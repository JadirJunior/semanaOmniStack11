const GenerateUniqueID = require('../../src/utils/GenerateUniqueId');

describe('Generate Unique ID', () => {
    it('deve gerar um único ID', () => {
       const id = GenerateUniqueID();
       
        expect(id).toHaveLength(8);
    });
})