using CalculateVAT.Models;

namespace CalculateVAT.Data
{
    public class DataBaseItems
    {
        public static IList<VATDataModel> GetVatData()
        {
            return new List<VATDataModel>
            {
                new VATDataModel
                {
                    Name = "France",
                    VAT = new double[]
                    {
                        5.5, 20, 10
                    }
                },
                new VATDataModel
                {
                    Name = "United Kingdom",
                    VAT = new double[]
                    {
                        5, 20
                    }
                },
                new VATDataModel
                {
                    Name = "Portugal",
                    VAT = new double[]
                    {
                        6, 13, 23
                    }
                },
                new VATDataModel
                {
                    Name = "Spain",
                    VAT = new double[]
                    {
                        21, 10
                    }
                }
            };
        }
    }
}
