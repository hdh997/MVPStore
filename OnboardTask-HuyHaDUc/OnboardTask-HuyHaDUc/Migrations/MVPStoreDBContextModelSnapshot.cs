﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OnboardTask_HuyHaDUc.Models;

namespace OnboardTask_HuyHaDUc.Migrations
{
    [DbContext(typeof(MVPStoreDBContext))]
    partial class MVPStoreDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("OnboardTask_HuyHaDUc.Models.MVPCustomer", b =>
                {
                    b.Property<int>("customerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("customerID");

                    b.ToTable("MVPCustomers");
                });

            modelBuilder.Entity("OnboardTask_HuyHaDUc.Models.MVPProduct", b =>
                {
                    b.Property<int>("productID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("productID");

                    b.ToTable("MVPProducts");
                });

            modelBuilder.Entity("OnboardTask_HuyHaDUc.Models.MVPSales", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("customerID")
                        .HasColumnType("int");

                    b.Property<DateTime>("dateSold")
                        .HasColumnType("Date");

                    b.Property<int>("productID")
                        .HasColumnType("int");

                    b.Property<int>("storeID")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("customerID");

                    b.HasIndex("productID");

                    b.HasIndex("storeID");

                    b.ToTable("MVPSales");
                });

            modelBuilder.Entity("OnboardTask_HuyHaDUc.Models.MVPStore", b =>
                {
                    b.Property<int>("storeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("storeID");

                    b.ToTable("MVPStores");
                });

            modelBuilder.Entity("OnboardTask_HuyHaDUc.Models.MVPSales", b =>
                {
                    b.HasOne("OnboardTask_HuyHaDUc.Models.MVPCustomer", "customer")
                        .WithMany()
                        .HasForeignKey("customerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnboardTask_HuyHaDUc.Models.MVPProduct", "product")
                        .WithMany()
                        .HasForeignKey("productID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnboardTask_HuyHaDUc.Models.MVPStore", "store")
                        .WithMany()
                        .HasForeignKey("storeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customer");

                    b.Navigation("product");

                    b.Navigation("store");
                });
#pragma warning restore 612, 618
        }
    }
}
