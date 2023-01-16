namespace CalculateVAT.Models
{
    public class VatCountry
    {
        public int Id
        {
            get; set;
        }

        public IList<VatValue> Vats
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }
    }
}