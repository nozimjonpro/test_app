import React, { useState, useMemo } from "react";
import { type Material } from "../types/material.type";

type MaterialsTableProps = {
  materials: Material[];
};

type SummaryData = {
  remind_start_amount: number;
  remind_start_sum: number;
  remind_income_amount: number;
  remind_income_sum: number;
  remind_outgo_amount: number;
  remind_outgo_sum: number;
  remind_end_amount: number;
  remind_end_sum: number;
};

type GroupedData = {
  [parent: string]: {
    summary: SummaryData;
    categories: {
      [category: string]: {
        summary: SummaryData;
        materials: Material[];
      };
    };
  };
};

const MaterialsTable: React.FC<MaterialsTableProps> = ({ materials }) => {
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Group and calculate summaries
  const { groupedData, totalSummary } = useMemo(() => {
    const grouped: GroupedData = {};
    const total: SummaryData = {
      remind_start_amount: 0,
      remind_start_sum: 0,
      remind_income_amount: 0,
      remind_income_sum: 0,
      remind_outgo_amount: 0,
      remind_outgo_sum: 0,
      remind_end_amount: 0,
      remind_end_sum: 0,
    };

    materials.forEach((material) => {
      // Initialize parent if not exists

      if (!grouped[material.parent]) {
        grouped[material.parent] = {
          summary: {
            remind_start_amount: 0,
            remind_start_sum: 0,
            remind_income_amount: 0,
            remind_income_sum: 0,
            remind_outgo_amount: 0,
            remind_outgo_sum: 0,
            remind_end_amount: 0,
            remind_end_sum: 0,
          },
          categories: {},
        };
      }

      // Initialize category if not exists
      if (!grouped[material.parent].categories[material.category]) {
        grouped[material.parent].categories[material.category] = {
          summary: {
            remind_start_amount: 0,
            remind_start_sum: 0,
            remind_income_amount: 0,
            remind_income_sum: 0,
            remind_outgo_amount: 0,
            remind_outgo_sum: 0,
            remind_end_amount: 0,
            remind_end_sum: 0,
          },
          materials: [],
        };
      }

      // Add material to category
      grouped[material.parent].categories[material.category].materials.push(
        material
      );

      // Update category summary
      const categorySummary =
        grouped[material.parent].categories[material.category].summary;
      categorySummary.remind_start_amount += material.remind_start_amount;
      categorySummary.remind_start_sum += material.remind_start_sum;
      categorySummary.remind_income_amount += material.remind_income_amount;
      categorySummary.remind_income_sum += material.remind_income_sum;
      categorySummary.remind_outgo_amount += material.remind_outgo_amount;
      categorySummary.remind_outgo_sum += material.remind_outgo_sum;
      categorySummary.remind_end_amount += material.remind_end_amount;
      categorySummary.remind_end_sum += material.remind_end_sum;

      // Update parent summary
      const parentSummary = grouped[material.parent].summary;
      parentSummary.remind_start_amount += material.remind_start_amount;
      parentSummary.remind_start_sum += material.remind_start_sum;
      parentSummary.remind_income_amount += material.remind_income_amount;
      parentSummary.remind_income_sum += material.remind_income_sum;
      parentSummary.remind_outgo_amount += material.remind_outgo_amount;
      parentSummary.remind_outgo_sum += material.remind_outgo_sum;
      parentSummary.remind_end_amount += material.remind_end_amount;
      parentSummary.remind_end_sum += material.remind_end_sum;

      // Update total summary
      total.remind_start_amount += material.remind_start_amount;
      total.remind_start_sum += material.remind_start_sum;
      total.remind_income_amount += material.remind_income_amount;
      total.remind_income_sum += material.remind_income_sum;
      total.remind_outgo_amount += material.remind_outgo_amount;
      total.remind_outgo_sum += material.remind_outgo_sum;
      total.remind_end_amount += material.remind_end_amount;
      total.remind_end_sum += material.remind_end_sum;
    });

    return { groupedData: grouped, totalSummary: total };
  }, [materials]);

  const toggleParent = (parent: string) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(parent)) {
      newExpanded.delete(parent);
    } else {
      newExpanded.add(parent);
    }
    setExpandedParents(newExpanded);
  };

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const SummaryRow: React.FC<{
    summary: SummaryData;
    label: string;
    level: "total" | "parent" | "category";
    isExpanded?: boolean;
    onToggle?: () => void;
  }> = ({ summary, label, level, isExpanded, onToggle }) => {
    const bgColor =
      level === "total"
        ? "bg-blue-50"
        : level === "parent"
        ? "bg-gray-50"
        : "bg-green-50";
    const textColor =
      level === "total"
        ? "text-blue-900"
        : level === "parent"
        ? "text-gray-900"
        : "text-green-900";
    const fontWeight =
      level === "total"
        ? "font-bold"
        : level === "parent"
        ? "font-semibold"
        : "font-medium";

    return (
      <tr className={`${bgColor} border-b border-gray-200`}>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center">
            {onToggle && (
              <button
                onClick={onToggle}
                className="mr-2 p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            <span className={`${textColor} ${fontWeight}`}>{label}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-center">-</td>
        <td className="px-4 py-3 text-sm text-center">-</td>
        <td className="px-4 py-3 text-sm text-center">-</td>
        <td className="px-4 py-3 text-sm text-center">-</td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_start_amount)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_start_sum)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_income_amount)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_income_sum)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_outgo_amount)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_outgo_sum)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_end_amount)}
        </td>
        <td className="px-4 py-3 text-sm text-right">
          {formatNumber(summary.remind_end_sum)}
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name/Code
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              Color
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              Unit
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              Width
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              Min Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Start Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Start Sum
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Income Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Income Sum
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Outgo Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Outgo Sum
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              End Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              End Sum
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Total Summary Row */}
          <SummaryRow
            summary={totalSummary}
            label="TOTAL SUMMARY"
            level="total"
          />

          {/* Parent Groups */}
          {Object.entries(groupedData).map(([parent, parentData]) => (
            <React.Fragment key={parent}>
              {/* Parent Summary Row */}
              <SummaryRow
                summary={parentData.summary}
                label={parent}
                level="parent"
                isExpanded={expandedParents.has(parent)}
                onToggle={() => toggleParent(parent)}
              />

              {/* Categories under this parent */}
              {expandedParents.has(parent) &&
                Object.entries(parentData.categories).map(
                  ([category, categoryData]) => (
                    <React.Fragment key={`${parent}-${category}`}>
                      {/* Category Summary Row */}
                      <SummaryRow
                        summary={categoryData.summary}
                        label={`  ${category}`}
                        level="category"
                        isExpanded={expandedCategories.has(
                          `${parent}-${category}`
                        )}
                        onToggle={() => toggleCategory(`${parent}-${category}`)}
                      />

                      {/* Materials under this category */}
                      {expandedCategories.has(`${parent}-${category}`) &&
                        categoryData.materials.map((material) => (
                          <tr
                            key={material.material_id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 text-sm">
                              <div className="ml-8">
                                <div className="font-medium text-gray-900">
                                  {material.name}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {material.code}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              {material.color ? (
                                <div className="flex items-center justify-center">
                                  <div
                                    className="w-4 h-4 rounded border border-gray-300"
                                    style={{ backgroundColor: material.color }}
                                  />
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              {material.unit}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              {material.width}
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              {material.min_amount
                                ? formatNumber(material.min_amount)
                                : "-"}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_start_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_start_sum)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_income_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_income_sum)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_outgo_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_outgo_sum)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_end_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              {formatNumber(material.remind_end_sum)}
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  )
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsTable;
