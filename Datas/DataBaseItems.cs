using CalculateVAT.Models;
using CalculateVAT.Repository;

namespace CalculateVAT.Data
{
    public class DataBaseItems
    {
        public static void AddVatData(IVatContext context)
        {
            var vats = new List<VatCountry>
            {
                new VatCountry
                {
                    Id = 1,
                    Name = "France",
                    Vats = new List<VatValue>
                    {
                        new VatValue
                        {
                            Id= 1,
                            Value = 5.5
                        },
                        new VatValue
                        {
                            Id= 2,
                            Value = 10
                        },
                        new VatValue
                        {
                            Id= 3,
                            Value = 20
                        }
                    }
                },
                new VatCountry
                {
                    Id = 2,
                    Name = "United Kingdom",
                    Vats = new List<VatValue>
                    {
                        new VatValue
                        {
                            Id= 4,
                            Value = 5,
                        },
                        new VatValue
                        {
                            Id= 5,
                            Value = 20
                        }
                    }
                },
                new VatCountry
                {
                    Id = 3,
                    Name = "Portugal",
                    Vats = new List<VatValue>
                    {
                        new VatValue
                        {
                            Id = 6,
                            Value = 6,
                        },
                        new VatValue
                        {
                            Id = 7,
                            Value = 13
                        },
                        new VatValue
                        {
                            Id = 8,
                            Value = 23
                        }
                    }
                },
                new VatCountry
                {
                    Id = 4,
                    Name = "Spain",
                    Vats = new List<VatValue>
                    {
                        new VatValue
                        {
                            Id= 9,
                            Value = 10
                        },
                        new VatValue
                        {
                            Id= 10,
                            Value = 21
                        },
                    }
                }
            };

            context.Vats.AddRange(vats);
            context.SaveChanges();
        }
    }
}